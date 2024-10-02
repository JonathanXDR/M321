import { Box, FormControl, TextInput, Textarea } from '@primer/react';
import { Dialog, DialogButtonProps } from '@primer/react/drafts';
import { useState } from 'react';
import { useNoteContext } from '../../contexts/note.context';

function NoteDialog() {
  const {
    selectedNote,
    setNoteDialogIsOpen,
    noteDialogType,
    closeNoteDialog,
    handleCreateNote,
    handleUpdateNote,
    handleDeleteNote,
  } = useNoteContext();

  const [updatedTitle, setUpdatedTitle] = useState(selectedNote.title);
  const [updatedContent, setUpdatedContent] = useState(selectedNote.content);
  const [createdTitle, setCreatedTitle] = useState('');
  const [createdContent, setCreatedContent] = useState('');

  const handleCancel = () => {
    setUpdatedTitle(selectedNote.title);
    setUpdatedContent(selectedNote.content);
    closeNoteDialog();
  };

  const getDialogTitle = () => {
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
        return 'Compose a new note to save your ideas';
      case 'update':
        return 'Edit and enhance your existing note';
      case 'delete':
        return 'Remove a note you no longer need';
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
            onClick: () => closeNoteDialog(),
          },
          {
            content: 'Save',
            buttonType: 'primary' as const,
            onClick: () => handleCreateNote(createdTitle, createdContent),
          },
        ];
      case 'update':
        return [
          { content: 'Cancel', onClick: handleCancel },
          {
            content: 'Save',
            buttonType: 'primary' as const,
            onClick: () =>
              handleUpdateNote(selectedNote.id, updatedTitle, updatedContent),
          },
        ];
      case 'delete':
        return [
          {
            content: 'Cancel',
            onClick: () => closeNoteDialog(),
          },
          {
            content: 'Delete',
            buttonType: 'danger' as const,
            onClick: () => handleDeleteNote(selectedNote.id),
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
    <Box onClick={(e) => e.stopPropagation()}>
      <Dialog
        title={getDialogTitle()}
        subtitle={getDialogSubtitle()}
        footerButtons={getFooterButtons()}
        onClose={() => setNoteDialogIsOpen(false)}
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
    </Box>
  );
}

export default NoteDialog;
