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
  const { noteCollectionDialogType } = useNoteCollectionContext();

  const [allNotes, setAllNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      const notesData = await fetchNotesData();
      setAllNotes(notesData);
    };
    fetchAllNotes();
  }, [fetchNotesData]);

  const AlertIconOcticon = () => (
    <StyledOcticon
      icon={AlertIcon}
      sx={{
        color: 'attention.fg',
        fill: 'currentColor !important',
      }}
    />
  );

  const [tokens, setTokens] = useState<InputToken[]>(
    notes.map((note: Note) => ({
      id: note.id,
      text: note.title,
      leadingVisual:
        note?.noteCollectionId !== null ? AlertIconOcticon : undefined,
      sx: { color: 'inherit' },
    }))
  );

  const selectedIds = tokens.map((token) => token.id);
  const [selectedItemIds, setSelectedItemIds] = useState(selectedIds);
  const removeToken = (tokenId: any) => {
    setTokens(tokens.filter((token) => token.id !== tokenId));
    setSelectedItemIds(selectedItemIds.filter((id) => id !== tokenId));
  };

  const isSelected = (itemId: any) => selectedItemIds.includes(itemId);
  const sortFn = (itemIdA: any, itemIdB: any) =>
    isSelected(itemIdA) === isSelected(itemIdB)
      ? 0
      : isSelected(itemIdA)
      ? 1
      : -1;

  const handleSelectedChange = (newItems: any) => {
    if (!Array.isArray(newItems)) {
      return;
    }

    setSelectedItemIds(newItems.map((item) => item.id));

    if (newItems.length < selectedItemIds.length) {
      const newItemIds = newItems.map(({ id }) => id);
      const removedIds = selectedIds.filter((id) => !newItemIds.includes(id));

      for (const removedId of removedIds) {
        removeToken(removedId);
      }

      return;
    }

    setTokens(
      newItems.map(({ id, text }) => {
        const note = allNotes.find((note) => note.id === id);
        return {
          id,
          text,
          leadingVisual:
            note?.noteCollectionId !== null ? AlertIconOcticon : undefined,
          sx: { color: 'inherit' },
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
          onTokenRemove={removeToken}
          onChange={(e) =>
            noteCollectionDialogType === 'create'
              ? setCreatedNotes(e.target.value)
              : setUpdatedNotes(e.target.value)
          }
          sx={{ width: '100 %' }}
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
                note?.noteCollectionId !== null ? AlertIconOcticon : undefined,
              sx: {
                color: 'inherit',
              },
            }))}
            selectedItemIds={selectedItemIds}
            onSelectedChange={handleSelectedChange}
            sortOnCloseFn={sortFn}
            selectionVariant="multiple"
            aria-labelledby="autocompleteLabel-customRenderedItem"
          />
        </Autocomplete.Overlay>
      </Autocomplete>

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
