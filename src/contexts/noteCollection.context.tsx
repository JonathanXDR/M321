import React, { createContext, useContext, useState, useCallback } from 'react';
import { NoteCollection } from '../types/NoteCollection/noteCollection.interface';
import { Note } from '../types/Note/note.interface';
import { noteCollections } from '../services/http.service';
import { useGeneralContext } from './general.context';
import { CheckIcon } from '@primer/octicons-react';

interface NoteCollectionProviderProps extends React.PropsWithChildren<{}> {}

type NoteCollectionDialogType = 'create' | 'update' | 'delete' | null;

interface NoteCollectionContextData {
  noteCollectionsData: NoteCollection[];
  setNoteCollectionsData: React.Dispatch<
    React.SetStateAction<NoteCollection[]>
  >;
  newNoteCollection: string;
  setNewNoteCollection: React.Dispatch<React.SetStateAction<string>>;
  noteCollectionDialogIsOpen: boolean;
  setNoteCollectionDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteCollectionDialogType: NoteCollectionDialogType;
  setNoteCollectionDialogType: React.Dispatch<
    React.SetStateAction<NoteCollectionDialogType>
  >;
  openNoteCollectionDialog: (type: NoteCollectionDialogType) => void;
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
  const [noteCollectionDialogType, setNoteCollectionDialogType] =
    useState<NoteCollectionDialogType>(null);

  const { handleFlash } = useGeneralContext();

  const openNoteCollectionDialog = useCallback(
    (type: NoteCollectionDialogType) => {
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
    handleFlash('NoteCollection created successfully!', CheckIcon, 'success');
    closeNoteCollectionDialog();
  }, [
    newNoteCollection,
    noteCollectionsData,
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
      handleFlash('NoteCollection updated successfully!', CheckIcon, 'success');
      closeNoteCollectionDialog();
    },
    [noteCollectionsData, handleFlash, closeNoteCollectionDialog]
  );

  const handleDeleteNoteCollection = useCallback(
    async (id: string) => {
      await noteCollections.delete(id);
      setNoteCollectionsData(
        noteCollectionsData.filter((noteCollection) => noteCollection.id !== id)
      );
      handleFlash('NoteCollection deleted successfully!', CheckIcon, 'success');
      closeNoteCollectionDialog();
    },
    [noteCollectionsData, handleFlash, closeNoteCollectionDialog]
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
