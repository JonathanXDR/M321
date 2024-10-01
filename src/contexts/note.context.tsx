import React, { createContext, useContext, useState, useCallback } from 'react';
import { Note } from '../types/Note/note.interface';
import { notes } from '../services/http.service';
import { useGeneralContext } from './general.context';
import { CheckIcon } from '@primer/octicons-react';

interface NoteProviderProps extends React.PropsWithChildren<{}> {}
interface NoteContextData {
  notesData: Note[];
  setNotesData: React.Dispatch<React.SetStateAction<Note[]>>;
  newNote: string;
  setNewNote: React.Dispatch<React.SetStateAction<string>>;
  noteDialogIsOpen: boolean;
  setNoteDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteDialogType: 'create' | 'update' | 'delete' | null;
  setNoteDialogType: React.Dispatch<
    React.SetStateAction<'create' | 'update' | 'delete' | null>
  >;
  openNoteDialog: (type: 'create' | 'update' | 'delete') => void;
  closeNoteDialog: () => void;
  handleCreateNote: () => Promise<void>;
  handleUpdateNote: (
    id: string,
    title: string,
    content: string
  ) => Promise<void>;
  handleDeleteNote: (id: string) => Promise<void>;
}

const NoteContext = createContext<NoteContextData | null>(null);

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [noteDialogIsOpen, setNoteDialogIsOpen] = useState(false);
  const [noteDialogType, setNoteDialogType] = useState<
    'create' | 'update' | 'delete' | null
  >(null);

  const { handleFlash } = useGeneralContext();

  const openNoteDialog = useCallback((type: 'create' | 'update' | 'delete') => {
    setNoteDialogType(type);
    setNoteDialogIsOpen(true);
  }, []);

  const closeNoteDialog = useCallback(() => {
    setNoteDialogIsOpen(false);
  }, []);

  const handleCreateNote = useCallback(async () => {
    if (!newNote) return;
    const createdNote = await notes.create({
      title: newNote,
      content: newNote,
    });
    setNotesData([...notesData, createdNote.data]);
    setNewNote('');
    handleFlash('Note created successfully!', CheckIcon, 'success');
    closeNoteDialog();
  }, [
    newNote,
    notesData,
    setNotesData,
    setNewNote,
    handleFlash,
    closeNoteDialog,
  ]);

  const handleUpdateNote = useCallback(
    async (id: string, title: string, content: string) => {
      const updatedNote = await notes.update(id, { title, content });
      setNotesData(
        notesData.map((note) => (note.id === id ? updatedNote.data : note))
      );
      handleFlash('Note updated successfully!', CheckIcon, 'success');
      closeNoteDialog();
    },
    [notesData, setNotesData, handleFlash, closeNoteDialog]
  );

  const handleDeleteNote = useCallback(
    async (id: string) => {
      await notes.delete(id);
      setNotesData(notesData.filter((note) => note.id !== id));
      handleFlash('Note deleted successfully!', CheckIcon, 'success');
      closeNoteDialog();
    },
    [notesData, setNotesData, handleFlash, closeNoteDialog]
  );

  return (
    <NoteContext.Provider
      value={{
        notesData,
        setNotesData,
        newNote,
        setNewNote,
        noteDialogIsOpen,
        setNoteDialogIsOpen,
        noteDialogType,
        setNoteDialogType,
        openNoteDialog,
        closeNoteDialog,
        handleCreateNote,
        handleUpdateNote,
        handleDeleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
