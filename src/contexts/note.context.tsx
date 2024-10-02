import React, { createContext, useContext, useState, useCallback } from 'react';
import { Note } from '../types/note.interface';
import { notes } from '../services/http.service';
import { useGeneralContext } from './general.context';
import { CheckIcon } from '@primer/octicons-react';
import { useConfirm } from '@primer/react';

interface NoteProviderProps extends React.PropsWithChildren<{}> {}

type NoteDialogType = 'create' | 'update' | 'delete' | null;

interface NoteContextData {
  setSelectedNote: React.Dispatch<React.SetStateAction<Note>>;
  selectedNote: Note;
  notesData: Note[];
  setNotesData: React.Dispatch<React.SetStateAction<Note[]>>;
  newNote: string;
  setNewNote: React.Dispatch<React.SetStateAction<string>>;
  noteDialogIsOpen: boolean;
  setNoteDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteDialogType: NoteDialogType;
  setNoteDialogType: React.Dispatch<React.SetStateAction<NoteDialogType>>;
  openNoteDialog: (type: NoteDialogType) => void;
  closeNoteDialog: () => void;
  handleCreateNote: () => Promise<void>;
  handleUpdateNote: (
    id: string,
    title: string,
    content: string
  ) => Promise<void>;
  handleDeleteNote: (id: string) => Promise<void>;
  confirmDeleteNote: (note: Note) => Promise<void>;
}

const defaultNote = {
  title: '',
  content: '',
} as Note;

const NoteContext = createContext<NoteContextData | null>(null);

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
  const [selectedNote, setSelectedNote] = useState<Note>(defaultNote);
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [noteDialogIsOpen, setNoteDialogIsOpen] = useState(false);
  const [noteDialogType, setNoteDialogType] = useState<NoteDialogType>(null);

  const { handleFlash } = useGeneralContext();
  const confirm = useConfirm();

  const openNoteDialog = useCallback((type: NoteDialogType) => {
    setNoteDialogType(type);
    setNoteDialogIsOpen(true);
  }, []);

  const closeNoteDialog = useCallback(() => {
    setNoteDialogIsOpen(false);
  }, []);

  const confirmDeleteNote = async (note: Note) => {
    if (
      await confirm({
        title: 'Confirm action?',
        content: 'Are you sure you want to delete this note?',
        confirmButtonType: 'danger',
      })
    ) {
      handleDeleteNote(note.id);
    }
  };

  const handleCreateNote = useCallback(async () => {
    if (!newNote) return;
    const createdNote = await notes.create({
      title: newNote,
      content: newNote,
    });
    setNotesData([...notesData, createdNote.data]);
    setNewNote('');
    handleFlash('success', 'Note created successfully!', true, CheckIcon);
    closeNoteDialog();
  }, [newNote, notesData, handleFlash, closeNoteDialog]);

  const handleUpdateNote = useCallback(
    async (id: string, title: string, content: string) => {
      const updatedNote = await notes.update(id, { title, content });
      setNotesData(
        notesData.map((note) => (note.id === id ? updatedNote.data : note))
      );
      handleFlash('success', 'Note updated successfully!', true, CheckIcon);
      closeNoteDialog();
    },
    [notesData, handleFlash, closeNoteDialog]
  );

  const handleDeleteNote = useCallback(
    async (id: string) => {
      await notes.delete(id);
      setNotesData(notesData.filter((note) => note.id !== id));
      console.log('Note deleted successfully!');
      handleFlash('success', 'Note deleted successfully!', true, CheckIcon);
      closeNoteDialog();
    },
    [notesData, handleFlash, closeNoteDialog]
  );

  return (
    <NoteContext.Provider
      value={{
        setSelectedNote,
        selectedNote,
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
        confirmDeleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
