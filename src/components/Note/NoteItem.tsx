import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import { Box, Button, ButtonGroup, Text } from '@primer/react';
import { Hidden } from '@primer/react/drafts';

import { useNoteContext } from '../../contexts/note.context';
import NoteActionMenu from './NoteActionMenu';

const NoteItem = ({ note }: any) => {
  const { openNoteDialog, setSelectedNote, confirmDeleteNote } =
    useNoteContext();

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
    paddingY: '8px',
    paddingX: '12px',
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text fontWeight="bold" sx={textStyle}>
          {note.title}
        </Text>
        <Text color="fg.subtle" sx={textStyle}>
          {note.content}
        </Text>
      </Box>

      <Hidden when={['narrow']}>
        <ButtonGroup>
          <Button
            leadingVisual={PencilIcon}
            variant="outline"
            onClick={() => {
              setSelectedNote(note);
              openNoteDialog('update');
            }}
          >
            Edit
          </Button>
          <Button
            leadingVisual={TrashIcon}
            variant="danger"
            onClick={() => {
              setSelectedNote(note);
              confirmDeleteNote(note);
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Hidden>

      <Hidden when={['regular', 'wide']}>
        <NoteActionMenu note={note} />
      </Hidden>
    </Box>
  );
};

export default NoteItem;
