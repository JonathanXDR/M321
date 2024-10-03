import { FormControl, TextInput, Text, Box } from '@primer/react';
import { Dialog, DialogButtonProps } from '@primer/react/drafts';
import { Note } from '../../types/note.interface';
import NotesFormControl from '../Note/NoteFormControl';

import { useState } from 'react';
import { useNoteCollectionContext } from '../../contexts/noteCollection.context';

function NoteCollectionDialog() {
  const {
    selectedNoteCollection,
    noteCollectionDialogType,
    closeNoteCollectionDialog,
    handleCreateNoteCollection,
    handleUpdateNoteCollection,
    handleDeleteNoteCollection,
  } = useNoteCollectionContext();

  const [updatedTitle, setUpdatedTitle] = useState(
    selectedNoteCollection.title
  );
  const [updatedNotes, setUpdatedNotes] = useState(
    selectedNoteCollection.notes
  );

  const [createdTitle, setCreatedTitle] = useState('');
  const [createdNotes, setCreatedNotes] = useState([] as Note[]);

  const handleCancel = () => {
    setUpdatedTitle(selectedNoteCollection.title);
    setUpdatedNotes(selectedNoteCollection.notes);
    closeNoteCollectionDialog();
  };

  const getDialogTitle = () => {
    switch (noteCollectionDialogType) {
      case 'create':
        return 'Create Note Collection';
      case 'update':
        return 'Edit Note Collection';
      case 'delete':
        return 'Delete Note Collection';
      default:
        return '';
    }
  };

  const getDialogSubtitle = () => {
    switch (noteCollectionDialogType) {
      case 'create':
        return 'Organize your notes by creating a collection';
      case 'update':
        return 'Modify and manage your note collections';
      case 'delete':
        return 'Delete a collection and its associated notes';
      default:
        return '';
    }
  };

  const getFooterButtons = (): DialogButtonProps[] => {
    switch (noteCollectionDialogType) {
      case 'create':
        return [
          { content: 'Cancel', onClick: handleCancel },
          {
            content: 'Save',
            buttonType: 'primary' as const,
            onClick: () =>
              handleCreateNoteCollection(createdTitle, createdNotes),
          },
        ];
      case 'update':
        return [
          { content: 'Cancel', onClick: handleCancel },
          {
            content: 'Save',
            buttonType: 'primary' as const,
            onClick: () =>
              handleUpdateNoteCollection(
                selectedNoteCollection.id,
                updatedTitle,
                updatedNotes
              ),
          },
        ];
      case 'delete':
        return [
          { content: 'Cancel', onClick: handleCancel },
          {
            content: 'Delete',
            buttonType: 'danger' as const,
            onClick: () =>
              handleDeleteNoteCollection(selectedNoteCollection.id),
          },
        ];
      default:
        return [];
    }
  };

  const titleValue =
    noteCollectionDialogType === 'create' ? createdTitle : updatedTitle;
  const notesValue =
    noteCollectionDialogType === 'create' ? createdNotes : updatedNotes;

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Dialog
        title={getDialogTitle()}
        subtitle={getDialogSubtitle()}
        footerButtons={getFooterButtons()}
        onClose={handleCancel}
      >
        {noteCollectionDialogType === 'delete' ? (
          <Text>
            Are you sure you want to delete this Note Collection and all its
            Notes?
          </Text>
        ) : (
          <>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
              <TextInput
                value={titleValue}
                placeholder="Enter title"
                onChange={(e) =>
                  noteCollectionDialogType === 'create'
                    ? setCreatedTitle(e.target.value)
                    : setUpdatedTitle(e.target.value)
                }
                sx={{ width: '100%', marginBottom: '4' }}
              />
            </FormControl>
            <NotesFormControl
              notes={selectedNoteCollection.notes}
              notesValue={notesValue}
              setCreatedNotes={setCreatedNotes}
              setUpdatedNotes={setUpdatedNotes}
            />
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default NoteCollectionDialog;
