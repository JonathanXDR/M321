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
    'create' | 'update' | 'delete' | null
  >(null);

  const handleNoteDialog = useCallback(
    (type?: 'create' | 'update' | 'delete') => {
      if (type) {
        setNoteDialogType(type);
      }
      setNoteDialogIsOpen(!noteDialogIsOpen);
    },
    [noteDialogIsOpen, noteDialogType]
  );

  return {
    noteDialogIsOpen,
    setNoteDialogIsOpen,
    noteDialogType,
    setNoteDialogType,
    handleNoteDialog,
  };
};

export const useCreateNote = (
  newNote: string,
  notesData: Note[],
  setNotesData: Function,
  setNewNote: Function
) => {
  const { handleFlash } = useHandleFlash();
  const { handleNoteDialog } = useNoteDialog();

  const handleCreateNote = useCallback(async () => {
    if (!newNote) return;
    const createdNote = await notes.create({
      title: newNote,
      content: newNote,
    });
    setNotesData([...notesData, createdNote.data]);
    setNewNote('');
    handleFlash('Note created successfully!');
    handleNoteDialog();
  }, [
    newNote,
    notesData,
    setNotesData,
    setNewNote,
    handleFlash,
    handleNoteDialog,
  ]);

  return handleCreateNote;
};

export const useUpdateNote = (notesData: Note[], setNotesData: Function) => {
  const { handleFlash } = useHandleFlash();
  const { handleNoteDialog } = useNoteDialog();

  const handleUpdateNote = useCallback(
    async (id: string, title: string, content: string) => {
      const updatedNote = await notes.update(id, { title, content });
      setNotesData(
        notesData.map((note) => (note.id === id ? updatedNote.data : note))
      );
      handleFlash('Note updated successfully!');
      handleNoteDialog();
    },
    [notesData, setNotesData, handleFlash, handleNoteDialog]
  );

  return handleUpdateNote;
};

export const useDeleteNote = (notesData: Note[], setNotesData: Function) => {
  const { handleFlash } = useHandleFlash();
  const { handleNoteDialog } = useNoteDialog();

  const handleDeleteNote = useCallback(
    async (id: string) => {
      await notes.delete(id);
      setNotesData(notesData.filter((note) => note.id !== id));
      handleFlash('Note deleted successfully!');
      handleNoteDialog();
    },
    [notesData, setNotesData, handleFlash, handleNoteDialog]
  );

  return handleDeleteNote;
};
