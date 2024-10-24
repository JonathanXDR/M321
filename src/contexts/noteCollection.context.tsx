import { useConfirm } from '@primer/react';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { noteCollections } from '../services/http.service';
import { Note } from '../types/note.interface';
import { NoteCollection } from '../types/noteCollection.interface';
import { useGeneralContext } from './general.context';

interface NoteCollectionProviderProps extends React.PropsWithChildren<{}> {}

type NoteCollectionDialogType = 'create' | 'update' | 'delete' | null;

interface NoteCollectionContextData {
  fetchNoteCollectionsData: () => Promise<NoteCollection[]>;
  setSelectedNoteCollection: React.Dispatch<
    React.SetStateAction<NoteCollection>
  >;
  selectedNoteCollection: NoteCollection;
  noteCollectionDialogIsOpen: boolean;
  setNoteCollectionDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteCollectionDialogType: NoteCollectionDialogType;
  setNoteCollectionDialogType: React.Dispatch<
    React.SetStateAction<NoteCollectionDialogType>
  >;
  openNoteCollectionDialog: (type: NoteCollectionDialogType) => void;
  closeNoteCollectionDialog: () => void;
  handleCreateNoteCollection: (title: string, notes: Note[]) => Promise<void>;
  handleUpdateNoteCollection: (
    id: string,
    title: string,
    notes: Note[]
  ) => Promise<void>;
  handleDeleteNoteCollection: (id: string) => Promise<void>;
  confirmDeleteNoteCollection: (
    noteCollection: NoteCollection
  ) => Promise<void>;
}

const defaultNoteCollection = {
  title: '',
  notes: [
    {
      title: '',
      content: '',
    },
  ],
} as NoteCollection;

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
  const [selectedNoteCollection, setSelectedNoteCollection] =
    useState<NoteCollection>(defaultNoteCollection);
  const [noteCollectionDialogIsOpen, setNoteCollectionDialogIsOpen] =
    useState(false);
  const [noteCollectionDialogType, setNoteCollectionDialogType] =
    useState<NoteCollectionDialogType>(null);

  const { handleFlash, noteCollectionsData, setNoteCollectionsData } =
    useGeneralContext();
  const confirm = useConfirm();

  const fetchNoteCollectionsData = async (): Promise<NoteCollection[]> => {
    const allNoteCollectionsResponse = await noteCollections.getAll();
    setNoteCollectionsData(allNoteCollectionsResponse.data);

    return allNoteCollectionsResponse.data;
  };

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

  const confirmDeleteNoteCollection = async (
    noteCollection: NoteCollection
  ) => {
    if (
      await confirm({
        title: 'Confirm action?',
        content: 'Are you sure you want to delete this note collection?',
        confirmButtonType: 'danger',
      })
    ) {
      handleDeleteNoteCollection(noteCollection.id);
    }
  };

  const handleCreateNoteCollection = useCallback(
    async (title: string, notes: Note[]) => {
      const createdNoteCollection = await noteCollections.create({
        title: title,
        notes: notes,
      });
      setNoteCollectionsData([
        ...noteCollectionsData,
        createdNoteCollection.data,
      ]);
      handleFlash('success', 'NoteCollection created successfully!', true);
      closeNoteCollectionDialog();
    },
    [noteCollectionsData, handleFlash, closeNoteCollectionDialog]
  );

  const handleUpdateNoteCollection = useCallback(
    async (id: string, title: string, notes: Note[]) => {
      const updatedNoteCollection = await noteCollections.update(id, {
        title: title,
        notes: notes,
      });
      setNoteCollectionsData(
        noteCollectionsData.map((noteCollection) =>
          noteCollection.id === id ? updatedNoteCollection.data : noteCollection
        )
      );
      handleFlash('success', 'NoteCollection updated successfully!', true);
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
      handleFlash('success', 'NoteCollection deleted successfully!', true);
      closeNoteCollectionDialog();
    },
    [noteCollectionsData, handleFlash, closeNoteCollectionDialog]
  );

  return (
    <NoteCollectionContext.Provider
      value={{
        fetchNoteCollectionsData,
        setSelectedNoteCollection,
        selectedNoteCollection,
        noteCollectionDialogIsOpen,
        setNoteCollectionDialogIsOpen,
        noteCollectionDialogType,
        setNoteCollectionDialogType,
        openNoteCollectionDialog,
        closeNoteCollectionDialog,
        handleCreateNoteCollection,
        handleUpdateNoteCollection,
        handleDeleteNoteCollection,
        confirmDeleteNoteCollection,
      }}
    >
      {children}
    </NoteCollectionContext.Provider>
  );
};
