import React, { createContext, useContext, useState, useCallback } from 'react';
import { NoteCollection } from '../types/NoteCollection/noteCollection.interface';
import { Note } from '../types/Note/note.interface';
import { noteCollections } from '../services/http.service';
import { useGeneralContext } from './general.context';

interface NoteCollectionProviderProps extends React.PropsWithChildren<{}> {}
interface NoteCollectionContextData {
  noteCollectionsData: NoteCollection[];
  setNoteCollectionsData: React.Dispatch<
    React.SetStateAction<NoteCollection[]>
  >;
  newNoteCollection: string;
  setNewNoteCollection: React.Dispatch<React.SetStateAction<string>>;
  noteCollectionDialogIsOpen: boolean;
  setNoteCollectionDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteCollectionDialogType: 'create' | 'update' | 'delete' | null;
  setNoteCollectionDialogType: React.Dispatch<
    React.SetStateAction<'create' | 'update' | 'delete' | null>
  >;
  openNoteCollectionDialog: (type: 'create' | 'update' | 'delete') => void;
  closeNoteCollectionDialog: () => void;
  handleCreateNoteCollection: () => Promise<void>;
  handleUpdateNoteCollection: (
    id: string,
    title: string,
    notes: Note[]
  ) => Promise<void>;
  handleDeleteNoteCollection: (id: string) => Promise<void>;
}

const NoteCollectionContext = createContext<NoteCollectionContextData | null>(
  null
);

export const useNoteCollectionContext = () => {
  const context = useContext(NoteCollectionContext);
  if (!context) {
    throw new Error(
      'useNoteCollectionContext must be used within a NoteCollectionProvider'
    );
  }
  return context;
};

export const NoteCollectionProvider: React.FC<NoteCollectionProviderProps> = ({
  children,
}) => {
  const [noteCollectionsData, setNoteCollectionsData] = useState<
    NoteCollection[]
  >([]);
  const [newNoteCollection, setNewNoteCollection] = useState('');

  const [noteCollectionDialogIsOpen, setNoteCollectionDialogIsOpen] =
    useState(false);
  const [noteCollectionDialogType, setNoteCollectionDialogType] = useState<
    'create' | 'update' | 'delete' | null
  >(null);

  const { handleFlash } = useGeneralContext();

  const openNoteCollectionDialog = useCallback(
    (type: 'create' | 'update' | 'delete') => {
      setNoteCollectionDialogType(type);
      setNoteCollectionDialogIsOpen(true);
    },
    []
  );

  const closeNoteCollectionDialog = useCallback(() => {
    setNoteCollectionDialogIsOpen(false);
  }, []);

  const handleCreateNoteCollection = useCallback(async () => {
    if (!newNoteCollection) return;
    const createdNoteCollection = await noteCollections.create({
      title: newNoteCollection,
      notes: [],
    });
    setNoteCollectionsData([
      ...noteCollectionsData,
      createdNoteCollection.data,
    ]);
    setNewNoteCollection('');
    handleFlash('NoteCollection created successfully!');
    closeNoteCollectionDialog();
  }, [
    newNoteCollection,
    noteCollectionsData,
    setNoteCollectionsData,
    setNewNoteCollection,
    handleFlash,
    closeNoteCollectionDialog,
  ]);

  const handleUpdateNoteCollection = useCallback(
    async (id: string, title: string, notes: Note[]) => {
      const updatedNoteCollection = await noteCollections.update(id, { title });
      setNoteCollectionsData(
        noteCollectionsData.map((noteCollection) =>
          noteCollection.id === id ? updatedNoteCollection.data : noteCollection
        )
      );
      handleFlash('NoteCollection updated successfully!');
      closeNoteCollectionDialog();
    },
    [
      noteCollectionsData,
      setNoteCollectionsData,
      handleFlash,
      closeNoteCollectionDialog,
    ]
  );

  const handleDeleteNoteCollection = useCallback(
    async (id: string) => {
      await noteCollections.delete(id);
      setNoteCollectionsData(
        noteCollectionsData.filter((noteCollection) => noteCollection.id !== id)
      );
      handleFlash('NoteCollection deleted successfully!');
      closeNoteCollectionDialog();
    },
    [
      noteCollectionsData,
      setNoteCollectionsData,
      handleFlash,
      closeNoteCollectionDialog,
    ]
  );

  return (
    <NoteCollectionContext.Provider
      value={{
        noteCollectionsData,
        setNoteCollectionsData,
        newNoteCollection,
        setNewNoteCollection,
        noteCollectionDialogIsOpen,
        setNoteCollectionDialogIsOpen,
        noteCollectionDialogType,
        setNoteCollectionDialogType,
        openNoteCollectionDialog,
        closeNoteCollectionDialog,
        handleCreateNoteCollection,
        handleUpdateNoteCollection,
        handleDeleteNoteCollection,
      }}
    >
      {children}
    </NoteCollectionContext.Provider>
  );
};
