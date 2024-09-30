import { FormControl, TextInput, Text, Box } from '@primer/react';
import { Dialog, DialogButtonProps } from '@primer/react/drafts';
import { Note } from '../../types/Note/note.interface';
import { NoteCollectionDialogProps } from '../../types/NoteCollection/noteCollectionDialogProps.interface';
import AutoCompleteTokenInput from '../AutoCompleteTokenInput';
import {
  useNoteCollectionState,
  useNoteCollectionDialog,
  useCreateNoteCollection,
  useUpdateNoteCollection,
  useDeleteNoteCollection,
} from '../../contexts/noteCollection.context';
import { useState } from 'react';

interface Token {
  id: string;
  text: string;
}

function NoteCollectionDialog({ noteCollection }: NoteCollectionDialogProps) {
  const [updatedTitle, setUpdatedTitle] = useState(noteCollection.title);
  const [updatedNotes, setUpdatedNotes] = useState(noteCollection.notes);

  const [createdTitle, setCreatedTitle] = useState('');
  const [createdNotes, setCreatedNotes] = useState([] as Note[]);

  const {
    noteCollectionsData,
    setNoteCollectionsData,
    newNoteCollection,
    setNewNoteCollection,
  } = useNoteCollectionState();
  const { closeNoteCollectionDialog, noteCollectionDialogType } =
    useNoteCollectionDialog();

  const handleCreateNoteCollection = useCreateNoteCollection(
    newNoteCollection,
    noteCollectionsData,
    setNoteCollectionsData,
    setNewNoteCollection
  );

  const handleUpdateNoteCollection = useUpdateNoteCollection(
    noteCollectionsData,
    setNoteCollectionsData
  );

  const handleDeleteNoteCollection = useDeleteNoteCollection(
    noteCollectionsData,
    setNoteCollectionsData
  );

  const handleCancel = () => {
    setUpdatedTitle(noteCollection.title);
    setUpdatedNotes(noteCollection.notes);
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
            onClick: () => handleCreateNoteCollection(),
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
                noteCollection.id,
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
            onClick: () => handleDeleteNoteCollection(noteCollection.id),
          },
        ];
      default:
        return [];
    }
  };

  const notesToTokens = (notes: Note[]): Token[] =>
    notes.map((note) => ({
      id: note.id,
      text: note.title,
    }));

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
                value={noteCollection.title}
                placeholder="Enter title"
                onChange={(e) =>
                  noteCollectionDialogType === 'create'
                    ? setCreatedTitle(e.target.value)
                    : setUpdatedTitle(e.target.value)
                }
                sx={{ width: '100%', marginBottom: '4' }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Notes</FormControl.Label>
              <AutoCompleteTokenInput
                initialNotes={noteCollection.notes}
                onNotesChange={(newNotes) => {
                  noteCollectionDialogType === 'create'
                    ? setCreatedNotes(newNotes)
                    : setUpdatedNotes(newNotes);
                }}
              />
              <FormControl.Validation
                id="warning"
                variant="warning"
                sx={{
                  marginTop: 2,
                }}
              >
                {/* <StyledOcticon icon={AlertIcon} color="attention.fg" /> */}
                Previous assigned notes will be reassigned to this
                NoteCollection
              </FormControl.Validation>
            </FormControl>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default NoteCollectionDialog;
