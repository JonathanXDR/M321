import React, { createContext, useContext, useState } from 'react';
import { Note } from '../types/note.interface';
import { NoteCollection } from '../types/noteCollection.interface';

interface GeneralProviderProps extends React.PropsWithChildren<{}> {}
interface GeneralContextData {
  notesData: Note[];
  setNotesData: React.Dispatch<React.SetStateAction<Note[]>>;
  noteCollectionsData: NoteCollection[];
  setNoteCollectionsData: React.Dispatch<
    React.SetStateAction<NoteCollection[]>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GeneralContext = createContext<GeneralContextData | null>(null);

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneralContext must be used within a GeneralProvider');
  }
  return context;
};

export const GeneralProvider: React.FC<GeneralProviderProps> = ({
  children,
}) => {
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [noteCollectionsData, setNoteCollectionsData] = useState<
    NoteCollection[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <GeneralContext.Provider
      value={{
        notesData,
        setNotesData,
        noteCollectionsData,
        setNoteCollectionsData,
        loading,
        setLoading,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
