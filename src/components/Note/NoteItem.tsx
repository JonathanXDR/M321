import {
  Box,
  Button,
  ButtonGroup,
  ConfirmationDialog,
  Text,
} from '@primer/react';
import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import { Hidden } from '@primer/react/drafts';
import { NoteItemProps } from '../../types/Note/noteItemProps.interface';

import NoteDialog from './NoteDialog';
import NoteActionMenu from './NoteActionMenu';
import { useNoteDialog } from '../../contexts/note.context';

function NoteItem({ note }: NoteItemProps) {
  const { noteDialogIsOpen, noteDialogType, openNoteDialog, closeNoteDialog } =
    useNoteDialog();

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
    <>
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
              onClick={() => openNoteDialog('update')}
            >
              Edit
            </Button>
            <Button
              leadingIcon={TrashIcon}
              variant="danger"
              onClick={() => openNoteDialog('delete')}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Hidden>

        <Hidden when={['regular', 'wide']}>
          <NoteActionMenu key={note.id} note={note} />
        </Hidden>
      </Box>

      {noteDialogIsOpen && noteDialogType !== 'delete' && (
        <NoteDialog key={note.id} note={note} />
      )}

      {noteDialogIsOpen && noteDialogType === 'delete' && (
        <ConfirmationDialog
          title="Confirm action?"
          onClose={() => closeNoteDialog()}
          confirmButtonType="danger"
        >
          Are you sure you want to delete this note?
        </ConfirmationDialog>
      )}
    </>
  );
}

export default NoteItem;
