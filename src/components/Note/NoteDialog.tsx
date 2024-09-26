import { FormControl, TextInput, Textarea } from '@primer/react';
import { Dialog, DialogButtonProps } from '@primer/react/drafts';
import { useState } from 'react';
import { NoteDialogProps } from '../../types/Note/noteDialogProps.interface';
import {
  useNoteState,
  useNoteDialog,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
} from '../../utils/note.util';

function NoteDialog({ note }: NoteDialogProps) {
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);
  const [createdTitle, setCreatedTitle] = useState('');
  const [createdContent, setCreatedContent] = useState('');

  const { notesData, setNotesData, newNote, setNewNote } = useNoteState();
  const { handleNoteDialog, noteDialogType } = useNoteDialog();

  const handleCreateNote = useCreateNote(
    newNote,
    notesData,
    setNotesData,
    setNewNote
  );
  const handleUpdateNote = useUpdateNote(notesData, setNotesData);
  const handleDeleteNote = useDeleteNote(notesData, setNotesData);

  const handleCancel = () => {
    setUpdatedTitle(note.title);
    setUpdatedContent(note.content);
    handleNoteDialog();
  };

  const getDialogTitle = () => {
    console.log('noteDialogType: ', noteDialogType);
    switch (noteDialogType) {
      case 'create':
        return 'Create note';
      case 'update':
        return 'Edit note';
      case 'delete':
        return 'Delete note';
      default:
        return '';
    }
  };

  const getDialogSubtitle = () => {
    switch (noteDialogType) {
      case 'create':
        return 'Create a new note';
      case 'update':
        return 'Edit an existing note';
      case 'delete':
        return 'Delete this note';
      default:
        return '';
    }
  };

  const getFooterButtons = (): DialogButtonProps[] => {
    switch (noteDialogType) {
      case 'create':
        return [
          {
            content: 'Cancel',
            onClick: () => handleNoteDialog(),
          },
          {
            content: 'Save',
            buttonType: 'primary' as const,
            onClick: () => handleCreateNote(),
          },
        ];
      case 'update':
        return [
          { content: 'Cancel', onClick: handleCancel },
          {
            content: 'Save',
            buttonType: 'primary' as const,
            onClick: () =>
              handleUpdateNote(note.id, updatedTitle, updatedContent),
          },
        ];
      case 'delete':
        return [
          {
            content: 'Cancel',
            onClick: () => handleNoteDialog(),
          },
          {
            content: 'Delete',
            buttonType: 'danger' as const,
            onClick: () => handleDeleteNote(note.id),
          },
        ];
      default:
        return [];
    }
  };

  const titleValue = noteDialogType === 'create' ? createdTitle : updatedTitle;
  const contentValue =
    noteDialogType === 'create' ? createdContent : updatedContent;

  return (
    <Dialog
      title={getDialogTitle()}
      subtitle={getDialogSubtitle()}
      footerButtons={getFooterButtons()}
      onClose={() => handleNoteDialog()}
    >
      <FormControl>
        <FormControl.Label>Title</FormControl.Label>
        <TextInput
          value={titleValue}
          placeholder="Enter title"
          onChange={(e) =>
            noteDialogType === 'create'
              ? setCreatedTitle(e.target.value)
              : setUpdatedTitle(e.target.value)
          }
          sx={{ width: '100%', marginBottom: '4' }}
          readOnly={noteDialogType === 'delete'}
        />
      </FormControl>

      <FormControl>
        <FormControl.Label>Content</FormControl.Label>
        <Textarea
          value={contentValue}
          placeholder="Enter content"
          onChange={(e) =>
            noteDialogType === 'create'
              ? setCreatedContent(e.target.value)
              : setUpdatedContent(e.target.value)
          }
          sx={{ width: '100%' }}
          readOnly={noteDialogType === 'delete'}
        />
      </FormControl>
    </Dialog>
  );
}

export default NoteDialog;
