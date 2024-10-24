import { AlertIcon } from '@primer/octicons-react';
import {
  Autocomplete,
  FormControl,
  StyledOcticon,
  TextInputWithTokens,
  Token,
} from '@primer/react';
import { useEffect, useState } from 'react';
import { useNoteContext } from '../../contexts/note.context';
import { useNoteCollectionContext } from '../../contexts/noteCollection.context';
import { InputToken } from '../../types/inputToken.interface';
import { Note } from '../../types/note.interface';
import BlankStateSystemError from '../BlankState/BlankStateSystemError';

function NotesFormControl({
  notesValue,
  setCreatedNotes,
  setUpdatedNotes,
}: any) {
  const { fetchNotesData } = useNoteContext();
  const { noteCollectionDialogType, selectedNoteCollection } =
    useNoteCollectionContext();

  const [allNotes, setAllNotes] = useState<Note[]>([]);

  useEffect(() => {
    try {
      const fetchAllNotes = async () => {
        const notesData = await fetchNotesData();
        setAllNotes(notesData);
      };
      fetchAllNotes();
    } catch (error) {
      <BlankStateSystemError httpError={error} />;
    }
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

  const notesToTokens = (notes: Note[] | string) =>
    typeof notes === 'string'
      ? []
      : notes.map((note: Note) => ({
          id: note.id,
          text: note.title,
          leadingVisual:
            note?.noteCollectionId === selectedNoteCollection.id
              ? undefined
              : note?.noteCollectionId !== null
                ? AlertIconOcticon
                : undefined,
          sx: { color: 'inherit' },
        }));

  console.log('notesValue', notesValue);
  const [tokens, setTokens] = useState<InputToken[]>(notesToTokens(notesValue));

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

  const [hasPreviouslyAssignedNotes, setHasPreviouslyAssignedNotes] =
    useState(false);

  const handleSelectedChange = (newItems: any) => {
    if (!Array.isArray(newItems)) {
      return;
    }

    setSelectedItemIds(newItems.map((item) => item.id));

    if (noteCollectionDialogType === 'create') {
      setCreatedNotes(newItems);
    } else {
      setUpdatedNotes(newItems);
    }

    if (newItems.length < selectedItemIds.length) {
      const newItemIds = newItems.map(({ id }) => id);
      const removedIds = selectedIds.filter((id) => !newItemIds.includes(id));

      for (const removedId of removedIds) {
        removeToken(removedId);
      }

      return;
    }

    const newTokens = newItems.map(({ id, text }) => {
      const note = allNotes.find((note) => note.id === id);
      return {
        id,
        text,
        leadingVisual:
          note?.noteCollectionId === selectedNoteCollection.id
            ? undefined
            : note?.noteCollectionId !== null
              ? AlertIconOcticon
              : undefined,
        sx: { color: 'inherit' },
      };
    });

    const hasAssignedNotes = newTokens.some((token) => {
      const note = allNotes.find((note) => note.id === token.id);
      return (
        note?.noteCollectionId !== null &&
        note?.noteCollectionId !== selectedNoteCollection.id
      );
    });

    setHasPreviouslyAssignedNotes(hasAssignedNotes);

    setTokens(newTokens);
  };

  useEffect(() => {
    try {
      const hasAssignedNotes = tokens.some((token) => {
        const note = allNotes.find((note) => note.id === token.id);
        return (
          note?.noteCollectionId !== null &&
          note?.noteCollectionId !== selectedNoteCollection.id
        );
      });

      setHasPreviouslyAssignedNotes(hasAssignedNotes);
    } catch (error) {
      <BlankStateSystemError httpError={error} />;
    }
  }, [tokens, allNotes, selectedNoteCollection.id]);

  return (
    <FormControl>
      <FormControl.Label>Notes</FormControl.Label>
      <Autocomplete>
        <Autocomplete.Input
          as={TextInputWithTokens}
          tokens={tokens}
          visibleTokenCount={5}
          tokenComponent={Token}
          onTokenRemove={removeToken}
          block
          onChange={(e) => {
            noteCollectionDialogType === 'create'
              ? setCreatedNotes(e.target.value)
              : setUpdatedNotes(e.target.value);
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
                note?.noteCollectionId === selectedNoteCollection.id
                  ? undefined
                  : note?.noteCollectionId !== null
                    ? AlertIconOcticon
                    : undefined,
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

      {hasPreviouslyAssignedNotes && (
        <FormControl.Validation
          id="warning"
          variant="warning"
          sx={{
            marginTop: 2,
          }}
        >
          Previous assigned notes will be reassigned to this NoteCollection
        </FormControl.Validation>
      )}
    </FormControl>
  );
}

export default NotesFormControl;
