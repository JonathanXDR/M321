import { Note } from '../types/Note/note.interface';
import { NoteCollection } from '../types/NoteCollection/noteCollection.interface';
import { notes, noteCollections } from '../services/http.service';
import { useState } from 'react';

export const fetchAllData = async (
  setNotesData: React.Dispatch<React.SetStateAction<Note[]>>,
  setNoteCollectionsData: React.Dispatch<
    React.SetStateAction<NoteCollection[]>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const allNotesResponse = await notes.getAll();
  setNotesData(allNotesResponse.data);

  const allNoteCollectionsResponse = await noteCollections.getAll();
  setNoteCollectionsData(allNoteCollectionsResponse.data);

  setLoading(false);
};

export const useHandleFlash = () => {
  const [flashVisible, setFlashVisible] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');

  const handleFlash = (message: string) => {
    setFlashMessage(message);
    setFlashVisible(true);

    setTimeout(() => {
      setFlashVisible(false);
    }, 10000);
  };

  return { flashVisible, flashMessage, handleFlash };
};
