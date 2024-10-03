import {
  Autocomplete,
  FormControl,
  StyledOcticon,
  TextInputWithTokens,
  Token,
} from '@primer/react';
import React, { useEffect, useState } from 'react';
import { Note } from '../types/note.interface';
import { AlertIcon } from '@primer/octicons-react';
import { useNoteContext } from '../contexts/note.context';
import { useNoteCollectionContext } from '../contexts/noteCollection.context';
import { InputToken } from '../types/inputToken.interface';

function NotesFormControl({ notes, setCreatedNotes, setUpdatedNotes }: any) {
  const { fetchNotesData } = useNoteContext();
  const { fetchNoteCollectionsData, noteCollectionDialogType } =
    useNoteCollectionContext();

  const [allNotes, setAllNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      const notesData = await fetchNotesData();
      setAllNotes(notesData);
    };
    fetchAllNotes();
  }, [fetchNotesData]);

  const AlertIconComponent = () => (
    <StyledOcticon
      icon={AlertIcon}
      sx={{
        color: 'attention.fg',
        fill: 'currentColor !important',
      }}
    />
  );

  // Set the initial tokens using the current notes
  const [tokens, setTokens] = React.useState<InputToken[]>(
    notes.map((note: Note) => ({
      id: note.id,
      text: note.title,
      leadingVisual:
        note?.noteCollectionId !== null ? AlertIconComponent : undefined,
      sx: {
        color: 'inherit',
      },
    }))
  );

  const selectedTokenIds = tokens.map((token) => token.id);
  const [selectedItemIds, setSelectedItemIds] =
    React.useState(selectedTokenIds);
  const onTokenRemove = (tokenId: any) => {
    setTokens(tokens.filter((token) => token.id !== tokenId));
    setSelectedItemIds(selectedItemIds.filter((id) => id !== tokenId));
  };

  const isItemSelected = (itemId: any) => selectedItemIds.includes(itemId);
  const customSortFn = (itemIdA: any, itemIdB: any) =>
    isItemSelected(itemIdA) === isItemSelected(itemIdB)
      ? 0
      : isItemSelected(itemIdA)
      ? 1
      : -1;

  const onSelectedChange = (newlySelectedItems: any) => {
    if (!Array.isArray(newlySelectedItems)) {
      return;
    }

    setSelectedItemIds(newlySelectedItems.map((item) => item.id));

    if (newlySelectedItems.length < selectedItemIds.length) {
      const newlySelectedItemIds = newlySelectedItems.map(({ id }) => id);
      const removedItemIds = selectedTokenIds.filter(
        (id) => !newlySelectedItemIds.includes(id)
      );

      for (const removedItemId of removedItemIds) {
        onTokenRemove(removedItemId);
      }

      return;
    }

    setTokens(
      newlySelectedItems.map(({ id, text, sx }) => {
        const note = allNotes.find((note) => note.id === id);
        return {
          id,
          text,
          leadingVisual:
            note?.noteCollectionId !== null ? AlertIconComponent : undefined,
          sx: {
            color: 'inherit',
          },
        };
      })
    );
  };

  return (
    <FormControl>
      <FormControl.Label>Notes</FormControl.Label>
      <Autocomplete>
        <Autocomplete.Input
          as={TextInputWithTokens}
          tokens={tokens}
          tokenComponent={Token}
          onTokenRemove={onTokenRemove}
          onChange={(e) =>
            noteCollectionDialogType === 'create'
              ? setCreatedNotes(e.target.value)
              : setUpdatedNotes(e.target.value)
          }
          sx={{
            width: '100%',
          }}
        />
        <Autocomplete.Overlay
          sx={{
            width: ['192px', '256px', '320px', '384px'],
            zIndex: 1000,
          }}
        >
          <Autocomplete.Menu
            items={allNotes.map((note: Note) => ({
              id: note.id,
              text: note.title,
              trailingVisual:
                note?.noteCollectionId !== null
                  ? AlertIconComponent
                  : undefined,
              sx: {
                color: 'inherit',
              },
            }))}
            selectedItemIds={selectedItemIds}
            onSelectedChange={onSelectedChange}
            sortOnCloseFn={customSortFn}
            selectionVariant="multiple"
            aria-labelledby="autocompleteLabel-customRenderedItem"
          />
        </Autocomplete.Overlay>
      </Autocomplete>

      {/* Show this validation message, if there are notes, which already have a relation to another noteCollection */}
      <FormControl.Validation
        id="warning"
        variant="warning"
        sx={{
          marginTop: 2,
        }}
      >
        Previous assigned notes will be reassigned to this NoteCollection
      </FormControl.Validation>
    </FormControl>
  );
}

export default NotesFormControl;
