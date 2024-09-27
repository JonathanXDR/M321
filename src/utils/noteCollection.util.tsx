import { useState, useCallback, useRef } from 'react';
import { NoteCollection } from '../types/NoteCollection/noteCollection.interface';
import { noteCollections } from '../services/http.service';
import { useHandleFlash } from './general.util';
import { Note } from '../types/Note/note.interface';

export const useNoteCollectionState = () => {
  const [noteCollectionsData, setNoteCollectionsData] = useState<
    NoteCollection[]
  >([]);
  const [newNoteCollection, setNewNoteCollection] = useState('');

  return {
    noteCollectionsData,
    setNoteCollectionsData,
    newNoteCollection,
    setNewNoteCollection,
  };
};

export const useNoteCollectionDialog = () => {
  const [noteCollectionDialogIsOpen, setNoteCollectionDialogIsOpen] =
    useState(false);
  const [noteCollectionDialogType, setNoteCollectionDialogType] = useState<
    'create' | 'update' | 'delete' | null
  >(null);

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

  return {
    noteCollectionDialogIsOpen,
    setNoteCollectionDialogIsOpen,
    noteCollectionDialogType,
    setNoteCollectionDialogType,
    openNoteCollectionDialog,
    closeNoteCollectionDialog,
  };
};

export const useCreateNoteCollection = (
  newNoteCollection: string,
  noteCollectionsData: NoteCollection[],
  setNoteCollectionsData: Function,
  setNewNoteCollection: Function
) => {
  const { handleFlash } = useHandleFlash();
  const { closeNoteCollectionDialog } = useNoteCollectionDialog();

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

  return handleCreateNoteCollection;
};

export const useUpdateNoteCollection = (
  noteCollectionsData: NoteCollection[],
  setNoteCollectionsData: Function
) => {
  const { handleFlash } = useHandleFlash();
  const { closeNoteCollectionDialog } = useNoteCollectionDialog();

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

  return handleUpdateNoteCollection;
};

export const useDeleteNoteCollection = (
  noteCollectionsData: NoteCollection[],
  setNoteCollectionsData: Function
) => {
  const { handleFlash } = useHandleFlash();
  const { closeNoteCollectionDialog } = useNoteCollectionDialog();

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

  return handleDeleteNoteCollection;
};
