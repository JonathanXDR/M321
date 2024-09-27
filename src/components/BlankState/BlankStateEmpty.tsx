import { Box, Button, Heading, Link, Text } from '@primer/react';
import { useNoteDialog, useNoteState } from '../../utils/note.util';
import {
  useNoteCollectionDialog,
  useNoteCollectionState,
} from '../../utils/noteCollection.util';

function BlankStateEmpty() {
  const { noteDialogIsOpen, openNoteDialog, closeNoteDialog } = useNoteDialog();
  const {
    noteCollectionDialogIsOpen,
    openNoteCollectionDialog,
    closeNoteCollectionDialog,
  } = useNoteCollectionDialog();
  const { notesData, setNotesData } = useNoteState();
  const { noteCollectionsData, setNoteCollectionsData } =
    useNoteCollectionState();

  return (
    <Box
      sx={{
        paddingX: ['0px', '10px', '20px', '40px'],
        paddingY: ['0px', '20px', '40px', '80px'],
      }}
    >
      <Box
        className="blankslate blankslate-large"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src="https://ghicons.github.com/assets/images/blue/svg/Collection.svg"
          alt=""
          className="blankslate-image"
        />
        <Heading as="h3" className="blankslate-heading">
          It looks like your library is empty.
        </Heading>
        <Text as="p">
          Notes and NoteCollections are a great way to organize your thoughts,
          ideas, and important information. Start creating and managing your
          library today!
        </Text>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <Box className="blankslate-action">
            <Button
              variant="primary"
              onClick={() => openNoteDialog('create')}
              sx={{
                marginRight: 3,
              }}
            >
              Create a new note
            </Button>
          </Box>
          <Box
            className="blankslate-action"
            onClick={() => openNoteCollectionDialog('create')}
            sx={{
              marginBottom: '0 !important',
            }}
          >
            <Button variant="default">Create a new NoteCollection</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BlankStateEmpty;
