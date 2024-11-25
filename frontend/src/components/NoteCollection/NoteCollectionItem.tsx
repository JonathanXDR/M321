import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import { Box, Button, ButtonGroup, Text } from '@primer/react';
import { Hidden } from '@primer/react/drafts';
import { useNoteCollectionContext } from '../../contexts/noteCollection.context';
import { Note } from '../../types/note.interface';
import NoteCollectionActionMenu from './NoteCollectionActionMenu';

const NoteCollectionItem = ({ noteCollection }: any) => {
  const {
    openNoteCollectionDialog,
    setSelectedNoteCollection,
    confirmDeleteNoteCollection,
  } = useNoteCollectionContext();

  const textStyle = {
    width: ['150px', '300px', '450px', '600px'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const boxStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: 8,
    paddingInline: 12,
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text fontWeight="bold" sx={textStyle}>
          {noteCollection.title}
        </Text>
        <Text color="fg.subtle" sx={textStyle}>
          {noteCollection.notes.map((note: Note) => note.title).join(', ')}
        </Text>
      </Box>
      <Box onClick={(e) => e.stopPropagation()}>
        <Hidden when={['narrow']}>
          <ButtonGroup>
            <Button
              leadingIcon={PencilIcon}
              variant="outline"
              onClick={() => {
                setSelectedNoteCollection(noteCollection);
                openNoteCollectionDialog('update');
              }}
            >
              Edit
            </Button>
            <Button
              leadingIcon={TrashIcon}
              variant="danger"
              onClick={() => {
                setSelectedNoteCollection(noteCollection);
                confirmDeleteNoteCollection(noteCollection);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Hidden>

        <Hidden when={['regular', 'wide']}>
          <NoteCollectionActionMenu noteCollection={noteCollection} />
        </Hidden>
      </Box>
    </Box>
  );
};

export default NoteCollectionItem;
