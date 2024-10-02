import { Autocomplete, Box, TextInputWithTokens } from '@primer/react';
import React, { useState } from 'react';
import { Token } from '../types/token.interface';
import { Note } from '../types/note.interface';

const AutoCompleteTokenInput: React.FC = ({ notes }: any) => {
  const initialTokens = notes.map((note: Note) => ({
    id: note.id,
    text: note.title,
  }));
  const [tokens, setTokens] = useState<Token[]>(initialTokens);

  const onTokenRemove = (tokenId: any) => {
    setTokens((prevTokens) =>
      prevTokens.filter((token) => token.id !== tokenId)
    );
  };

  const generateItems = (
    items: Token[],
    leadingVisual?: any,
    trailingVisual?: any
  ) => items.map((item) => ({ ...item, leadingVisual, trailingVisual }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    if (query === '') {
      setTokens(initialTokens);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete>
        <Autocomplete.Input
          sx={{ width: '100%' }}
          as={TextInputWithTokens}
          tokens={generateItems(tokens)}
          onTokenRemove={onTokenRemove}
          loaderPosition="leading"
          onChange={handleInputChange}
        />
        <Autocomplete.Overlay
          sx={{ width: ['192px', '256px', '320px', '384px'], zIndex: 1000 }}
        >
          <Autocomplete.Menu
            items={generateItems(tokens)}
            selectedItemIds={tokens.map((token) => token.id)}
            aria-labelledby="Notes"
            // onSelectedChange={setTokens}
            selectionVariant="multiple"
          />
        </Autocomplete.Overlay>
      </Autocomplete>
    </Box>
  );
};

export default AutoCompleteTokenInput;
