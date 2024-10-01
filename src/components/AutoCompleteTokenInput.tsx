import { Autocomplete, Box, TextInputWithTokens } from '@primer/react';
import React, { useEffect, useState } from 'react';
import { notes } from '../services/http.service';
import { Token } from '../types/token.interface';
import { AutoCompleteTokenInputProps } from '../types/AutoCompleteTokenInputProps.interface';
import { Note } from '../types/note.interface';

function AutoCompleteTokenInput({
  initialNotes = [],
  onNotesChange,
}: AutoCompleteTokenInputProps) {
  const initialTokens = initialNotes.map((note) => ({
    id: note.id,
    text: note.title,
  }));
  const [tokens, setTokens] = React.useState<Token[]>(initialTokens);
  const [noteCollectionNotes, setNoteCollectionNotes] = useState<Token[]>([]);
  const selectedTokenIds = tokens.map((token) => token.id);
  const [selectedItemIds, setSelectedItemIds] =
    React.useState(selectedTokenIds);
  const isItemSelected = (itemId: any) => selectedItemIds.includes(itemId);

  const onTokenRemove = (tokenId: any) => {
    setTokens(tokens.filter((token) => token.id !== tokenId));
    setSelectedItemIds(selectedItemIds.filter((id) => id !== tokenId));
  };

  const generateItems = (
    items: Token[],
    leadingVisual?: any,
    trailingVisual?: any
  ) => {
    return items.map((item) => ({
      ...item,
      leadingVisual,
      trailingVisual,
    }));
  };

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

    setTokens(newlySelectedItems.map(({ id, text }) => ({ id, text })));
  };

  useEffect(() => {
    const newNotes = tokens
      .map((token) => initialNotes.find((note) => note.id === token.id))
      .filter((note) => note !== undefined) as Note[];
    onNotesChange(newNotes);
  }, [tokens, onNotesChange, initialNotes]);

  const sortItems = (items: Token[]) => {
    return items.sort((a, b) => {
      if (isItemSelected(a.id) === isItemSelected(b.id)) return 0;
      return isItemSelected(a.id) ? 1 : -1;
    });
  };

  useEffect(() => {
    setNoteCollectionNotes((prevNotes) => sortItems(prevNotes));
  }, [selectedItemIds]);

  const fetchNotes = async () => {
    try {
      const response = await notes.getAll();
      const notesData = response.data;

      const noteTokens = notesData.map((note) => ({
        text: note.title,
        id: note.id,
      }));

      setNoteCollectionNotes(sortItems(noteTokens));
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
    setSelectedItemIds(initialNotes.map((note) => note.id));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    if (query === '') {
      setSelectedItemIds(noteCollectionNotes.map((token) => token.id));
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Autocomplete>
          <Autocomplete.Input
            sx={{
              width: '100%',
            }}
            as={TextInputWithTokens}
            // visibleTokenCount={2}
            tokens={generateItems(
              tokens
              // show the Alert icon if the current note already has a relation to another noteCollection
            )}
            // tokenComponent={}
            onTokenRemove={onTokenRemove}
            // loading={true}
            loaderPosition="leading"
            onChange={handleInputChange}
            // size="medium"
          />
          <Autocomplete.Overlay
            sx={{
              width: ['192px', '256px', '320px', '384px'],
              zIndex: 1000,
            }}
          >
            <Autocomplete.Menu
              items={generateItems(
                noteCollectionNotes,
                null
                // show the Alert icon if the current note already has a relation to another noteCollection
              )}
              selectedItemIds={selectedItemIds}
              aria-labelledby="Notes"
              onSelectedChange={onSelectedChange}
              selectionVariant="multiple"
            />
          </Autocomplete.Overlay>
        </Autocomplete>
      </Box>
    </Box>
  );
}

export default AutoCompleteTokenInput;
