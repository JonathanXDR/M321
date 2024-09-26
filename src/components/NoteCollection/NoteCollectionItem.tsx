import {
  Box,
  Button,
  ButtonGroup,
  ConfirmationDialog,
  Text,
} from '@primer/react';
import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import { Hidden } from '@primer/react/drafts';
import { NoteCollectionItemProps } from '../../types/NoteCollection/noteCollectionItemProps.interface';

import NoteCollectionDialog from './NoteCollectionDialog';
import NoteCollectionActionMenu from '../NoteCollection/NoteCollectionActionMenu';
import { useNoteCollectionDialog } from '../../utils/noteCollection.util';

function NoteCollectionItem({ noteCollection }: NoteCollectionItemProps) {
  const {
    handleNoteCollectionDialog,
    noteCollectionDialogIsOpen,
    noteCollectionDialogType,
  } = useNoteCollectionDialog();

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
            {noteCollection.title}
          </Text>
          <Text color="fg.subtle" sx={textStyle}>
            {noteCollection.notes.map((note) => note.title).join(', ')}
          </Text>
        </Box>
        <Box onClick={(e) => e.stopPropagation()}>
          <Hidden when={['narrow']}>
            <ButtonGroup>
              <Button
                leadingIcon={PencilIcon}
                variant="outline"
                onClick={() => handleNoteCollectionDialog('update')}
              >
                Edit
              </Button>
              <Button
                leadingIcon={TrashIcon}
                variant="danger"
                onClick={() => handleNoteCollectionDialog('delete')}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Hidden>

          <Hidden when={['regular', 'wide']}>
            <NoteCollectionActionMenu
              key={noteCollection.id}
              noteCollection={noteCollection}
            />
          </Hidden>
        </Box>
      </Box>

      {noteCollectionDialogIsOpen && noteCollectionDialogType !== 'delete' && (
        <NoteCollectionDialog
          key={noteCollection.id}
          noteCollection={noteCollection}
        />
      )}

      {noteCollectionDialogIsOpen && noteCollectionDialogType === 'delete' && (
        <ConfirmationDialog
          title="Confirm action?"
          onClose={() => handleNoteCollectionDialog()}
        >
          Are you sure you want to delete this note?
        </ConfirmationDialog>
      )}
    </>
  );
}

export default NoteCollectionItem;
