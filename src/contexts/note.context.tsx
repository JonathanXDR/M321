import { useConfirm } from '@primer/react';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { notes } from '../services/http.service';
import { Note } from '../types/note.interface';
import { useGeneralContext } from './general.context';

interface NoteProviderProps extends React.PropsWithChildren<{}> {}

type NoteDialogType = 'create' | 'update' | 'delete' | null;

interface NoteContextData {
  fetchNotesData: () => Promise<Note[]>;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note>>;
  selectedNote: Note;
  noteDialogIsOpen: boolean;
  setNoteDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteDialogType: NoteDialogType;
  setNoteDialogType: React.Dispatch<React.SetStateAction<NoteDialogType>>;
  openNoteDialog: (type: NoteDialogType) => void;
  closeNoteDialog: () => void;
  handleCreateNote: (title: string, content: string) => Promise<void>;
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
  const [noteDialogIsOpen, setNoteDialogIsOpen] = useState(false);
  const [noteDialogType, setNoteDialogType] = useState<NoteDialogType>(null);

  const { handleFlash, notesData, setNotesData } = useGeneralContext();
  const confirm = useConfirm();

  const fetchNotesData = useCallback(async (): Promise<Note[]> => {
    const allNotesResponse = await notes.getAll();
    setNotesData(allNotesResponse.data);

    return allNotesResponse.data;
  }, [notes, setNotesData]);

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

  const handleCreateNote = useCallback(
    async (title: string, content: string) => {
      const createdNote = await notes.create({
        title: title,
        content: content,
      });
      setNotesData([...notesData, createdNote.data]);
      handleFlash('success', 'Note created successfully!', true);
      closeNoteDialog();
    },
    [notesData, handleFlash, closeNoteDialog]
  );

  const handleUpdateNote = useCallback(
    async (id: string, title: string, content: string) => {
      const updatedNote = await notes.update(id, { title, content });
      setNotesData(
        notesData.map((note) => (note.id === id ? updatedNote.data : note))
      );
      handleFlash('success', 'Note updated successfully!', true);
      closeNoteDialog();
    },
    [notesData, handleFlash, closeNoteDialog]
  );

  const handleDeleteNote = useCallback(
    async (id: string) => {
      await notes.delete(id);
      setNotesData(notesData.filter((note) => note.id !== id));
      handleFlash('success', 'Note deleted successfully!', true);
      closeNoteDialog();
    },
    [notesData, handleFlash, closeNoteDialog]
  );

  return (
    <NoteContext.Provider
      value={{
        fetchNotesData,
        setSelectedNote,
        selectedNote,
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
