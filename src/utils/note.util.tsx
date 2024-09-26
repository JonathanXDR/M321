import { useState, useCallback, useRef } from 'react';
import { Note } from '../types/Note/note.interface';
import { notes } from '../services/http.service';
import { useHandleFlash } from './general.util';

export const useNoteState = () => {
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  return { notesData, setNotesData, newNote, setNewNote };
};

export const useNoteDialog = () => {
  const [noteDialogIsOpen, setNoteDialogIsOpen] = useState(false);
  const [noteDialogType, setNoteDialogType] = useState<
    'create' | 'update' | 'delete'
  >('create');

  const openNoteDialog = useCallback((type: 'create' | 'update' | 'delete') => {
    setNoteDialogType(type);
    setNoteDialogIsOpen(true);
  }, []);

  const closeNoteDialog = useCallback(() => {
    setNoteDialogIsOpen(false);
  }, []);

  return {
    noteDialogIsOpen,
    setNoteDialogIsOpen,
    noteDialogType,
    setNoteDialogType,
    openNoteDialog,
    closeNoteDialog,
  };
};

export const useCreateNote = (
  newNote: string,
  notesData: Note[],
  setNotesData: Function,
  setNewNote: Function
) => {
  const { handleFlash } = useHandleFlash();
  const { closeNoteDialog } = useNoteDialog();

  const handleCreateNote = useCallback(async () => {
    if (!newNote) return;
    const createdNote = await notes.create({
      title: newNote,
      content: newNote,
    });
    setNotesData([...notesData, createdNote.data]);
    setNewNote('');
    handleFlash('Note created successfully!');
    closeNoteDialog();
  }, [
    newNote,
    notesData,
    setNotesData,
    setNewNote,
    handleFlash,
    closeNoteDialog,
  ]);

  return handleCreateNote;
};

export const useUpdateNote = (notesData: Note[], setNotesData: Function) => {
  const { handleFlash } = useHandleFlash();
  const { closeNoteDialog } = useNoteDialog();

  const handleUpdateNote = useCallback(
    async (id: string, title: string, content: string) => {
      const updatedNote = await notes.update(id, { title, content });
      setNotesData(
        notesData.map((note) => (note.id === id ? updatedNote.data : note))
      );
      handleFlash('Note updated successfully!');
      closeNoteDialog();
    },
    [notesData, setNotesData, handleFlash, closeNoteDialog]
  );

  return handleUpdateNote;
};

export const useDeleteNote = (notesData: Note[], setNotesData: Function) => {
  const { handleFlash } = useHandleFlash();
  const { closeNoteDialog } = useNoteDialog();

  const handleDeleteNote = useCallback(
    async (id: string) => {
      await notes.delete(id);
      setNotesData(notesData.filter((note) => note.id !== id));
      handleFlash('Note deleted successfully!');
      closeNoteDialog();
    },
    [notesData, setNotesData, handleFlash, closeNoteDialog]
  );

  return handleDeleteNote;
};
