import {
  AnchoredOverlay,
  Autocomplete,
  Box,
  Button,
  FormControl,
  IssueLabelToken,
  TextInputWithTokens,
} from '@primer/react';
import React from 'react';
import { notes, noteCollections } from '../services/http.service';
import { Token } from '../types/token.interface';
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
  const { fetchAllData } = useGeneralContext();

  function getColorCircle(color: any) {
    return function () {
      return (
        <>
          <Box
            bg={color}
            borderColor={color}
            width={14}
            height={14}
            borderRadius={10}
            margin="auto"
            borderWidth="1px"
            borderStyle="solid"
          />
        </>
      );
    };
  }

  const [tokens, setTokens] = React.useState([
    { text: 'enhancement', id: 1, fillColor: '#a2eeef' },
    { text: 'bug', id: 2, fillColor: '#d73a4a' },
    { text: 'good first issue', id: 3, fillColor: '#0cf478' },
  ]);
  const selectedTokenIds = tokens.map((token) => token.id);
  const [selectedItemIds, setSelectedItemIds] =
    React.useState(selectedTokenIds);
  const onTokenRemove = (tokenId: any) => {
    setTokens(tokens.filter((token) => token.id !== tokenId));
    setSelectedItemIds(selectedItemIds.filter((id) => id !== tokenId));
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

    setTokens(
      newlySelectedItems.map(({ id, text, metadata }) => ({
        id,
        text,
        fillColor: metadata.fillColor,
      }))
    );
  };

  return (
    <>
      <FormControl>
        <FormControl.Label id="autocompleteLabel-customRenderedItem">
          Pick labels
        </FormControl.Label>
        <Autocomplete>
          <Autocomplete.Input
            as={TextInputWithTokens}
            tokens={tokens}
            tokenComponent={IssueLabelToken}
            onTokenRemove={onTokenRemove}
          />
          <Autocomplete.Overlay>
            <Autocomplete.Menu
              items={[
                {
                  leadingVisual: getColorCircle('#a2eeef'),
                  text: 'enhancement',
                  id: 1,
                  metadata: { fillColor: '#a2eeef' },
                },
                {
                  leadingVisual: getColorCircle('#d73a4a'),
                  text: 'bug',
                  id: 2,
                  metadata: { fillColor: '#d73a4a' },
                },
                {
                  leadingVisual: getColorCircle('#0cf478'),
                  text: 'good first issue',
                  id: 3,
                  metadata: { fillColor: '#0cf478' },
                },
                {
                  leadingVisual: getColorCircle('#ffd78e'),
                  text: 'design',
                  id: 4,
                  metadata: { fillColor: '#ffd78e' },
                },
                {
                  leadingVisual: getColorCircle('#ff0000'),
                  text: 'blocker',
                  id: 5,
                  metadata: { fillColor: '#ff0000' },
                },
                {
                  leadingVisual: getColorCircle('#a4f287'),
                  text: 'backend',
                  id: 6,
                  metadata: { fillColor: '#a4f287' },
                },
                {
                  leadingVisual: getColorCircle('#8dc6fc'),
                  text: 'frontend',
                  id: 7,
                  metadata: { fillColor: '#8dc6fc' },
                },
              ]}
              selectedItemIds={selectedItemIds}
              onSelectedChange={onSelectedChange}
              selectionVariant="multiple"
              aria-labelledby="autocompleteLabel-customRenderedItem"
            />
          </Autocomplete.Overlay>
        </Autocomplete>
      </FormControl>
    </>
  );

  // const selectedTokenIds = tokens.map((token) => token.id);
  // const [selectedItemIds, setSelectedItemIds] =
  //   React.useState(selectedTokenIds);
  // const onTokenRemove = (tokenId: string) => {
  //   setTokens(tokens.filter((token) => token.id !== tokenId));
  //   setSelectedItemIds(selectedItemIds.filter((id) => id !== tokenId));
  // };
  // const onSelectedChange = (newlySelectedItems) => {
  //   if (!Array.isArray(newlySelectedItems)) {
  //     return;
  //   }

  //   setSelectedItemIds(newlySelectedItems.map((item) => item.id));

  //   if (newlySelectedItems.length < selectedItemIds.length) {
  //     const newlySelectedItemIds = newlySelectedItems.map(({ id }) => id);
  //     const removedItemIds = selectedTokenIds.filter(
  //       (id) => !newlySelectedItemIds.includes(id)
  //     );

  //     for (const removedItemId of removedItemIds) {
  //       onTokenRemove(removedItemId);
  //     }

  //     return;
  //   }

  //   setTokens(newlySelectedItems.map(({ id, text }) => ({ id, text })));
  // };

  // return (
  // <Box as="form" sx={{ p: 3 }}>
  //   <AnchoredOverlay
  //     open={isOpen}
  //     onOpen={handleOpen}
  //     onClose={() => setIsOpen(false)}
  //     width="large"
  //     height="xsmall"
  //     focusTrapSettings={{ initialFocusRef: inputRef }}
  //     side="inside-top"
  //     renderAnchor={(props) => <Button {...props}>open overlay</Button>}
  //   >
  //     <Autocomplete>
  //       <Box display="flex" flexDirection="column" height="100%">
  //         <Box
  //           borderWidth={0}
  //           borderBottomWidth={1}
  //           borderColor="border.default"
  //           borderStyle="solid"
  //         >
  //           <Autocomplete.Input
  //             ref={inputRef}
  //             sx={{
  //               display: 'flex',
  //               border: '0',
  //               paddingX: 3,
  //               paddingY: 1,
  //               boxShadow: 'none',
  //               ':focus-within': {
  //                 border: '0',
  //                 boxShadow: 'none',
  //               },
  //             }}
  //             {...textInputArgs}
  //             size={textInputArgs.inputSize}
  //             block
  //           />
  //         </Box>
  //         <Box
  //           overflow="auto"
  //           flexGrow={1}
  //           ref={scrollContainerRef as RefObject<HTMLDivElement>}
  //         >
  //           <Autocomplete.Menu
  //             items={items}
  //             selectedItemIds={[]}
  //             customScrollContainerRef={scrollContainerRef}
  //             aria-labelledby="autocompleteLabel"
  //             {...menuArgs}
  //           />
  //         </Box>
  //       </Box>
  //     </Autocomplete>
  //   </AnchoredOverlay>
  // </Box>
  // );
}

export default AutoCompleteTokenInput;
