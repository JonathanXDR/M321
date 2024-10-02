import {
  Autocomplete,
  Box,
  StyledOcticon,
  TextInputWithTokens,
  Token,
} from '@primer/react';
import React from 'react';
import { notes, noteCollections } from '../services/http.service';
import { Note } from '../types/note.interface';
import { NoteCollection } from '../types/noteCollection.interface';
import { useGeneralContext } from '../contexts/general.context';
import { AlertIcon } from '@primer/octicons-react';

function AutoCompleteTokenInput({ notes }: any) {
  // const initialTokens = notes.map((note: Note) => ({
  //   id: note.id,
  //   text: note.title,
  //   assigned: note.noteCollectionId !== null,
  // }));
  // const [tokens, setTokens] = React.useState<Token[]>(initialTokens);
  const { fetchAllData, useImportantColor } = useGeneralContext();

  const [tokens, setTokens] = React.useState([
    {
      id: 1,
      text: 'enhancement',
      leadingVisual: AlertIcon,
      sx: { color: 'attention.fg' },
    },
    {
      id: 2,
      text: 'bug',
      leadingVisual: AlertIcon,
      sx: { color: 'attention.fg' },
    },
    {
      id: 3,
      text: 'good first issue',
      leadingVisual: AlertIcon,
      sx: { color: 'attention.fg' },
    },
  ]);
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
      newlySelectedItems.map(({ id, text, leadingVisual, sx }) => ({
        id,
        text,
        leadingVisual,
        sx,
      }))
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Autocomplete>
        <Autocomplete.Input
          as={TextInputWithTokens}
          tokens={tokens}
          tokenComponent={Token}
          onTokenRemove={onTokenRemove}
        />
        <Autocomplete.Overlay
          sx={{
            width: ['192px', '256px', '320px', '384px'],
            zIndex: 1000,
          }}
        >
          <Autocomplete.Menu
            items={[
              {
                id: 1,
                text: 'enhancement',
                leadingVisual: () => (
                  <StyledOcticon
                    icon={AlertIcon}
                    sx={{ fill: 'currentcolor !important' }}
                  />
                ),
                sx: { color: 'attention.fg' },
              },
              {
                id: 2,
                text: 'bug',
                leadingVisual: () => (
                  <StyledOcticon
                    icon={AlertIcon}
                    sx={{ fill: 'currentcolor !important' }}
                  />
                ),
                sx: { color: 'attention.fg' },
              },
              {
                id: 3,
                text: 'good first issue',
                leadingVisual: () => (
                  <StyledOcticon
                    icon={AlertIcon}
                    sx={{ fill: 'currentcolor !important' }}
                  />
                ),
                sx: { color: 'attention.fg' },
              },
            ]}
            selectedItemIds={selectedItemIds}
            onSelectedChange={onSelectedChange}
            sortOnCloseFn={customSortFn}
            selectionVariant="multiple"
            aria-labelledby="autocompleteLabel-customRenderedItem"
          />
        </Autocomplete.Overlay>
      </Autocomplete>
    </Box>
  );
}

export default AutoCompleteTokenInput;
