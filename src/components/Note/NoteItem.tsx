import { Box, Button, ButtonGroup, Text } from '@primer/react';
import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import { Hidden } from '@primer/react/drafts';

import NoteActionMenu from './NoteActionMenu';
import { useNoteContext } from '../../contexts/note.context';
import { Note } from '../../types/note.interface';

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
    paddingBlock: 8,
    paddingInline: 12,
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
            leadingIcon={PencilIcon}
            variant="outline"
            onClick={() => {
              setSelectedNote(note);
              openNoteDialog('update');
            }}
          >
            Edit
          </Button>
          <Button
            leadingIcon={TrashIcon}
            variant="danger"
            onClick={() => {
              setSelectedNote(note);
              confirmDeleteNote();
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Hidden>

      <Hidden when={['regular', 'wide']}>
        <NoteActionMenu />
      </Hidden>
    </Box>
  );
};

export default NoteItem;
