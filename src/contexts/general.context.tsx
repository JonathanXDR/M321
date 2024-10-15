import React, { createContext, useContext, useState } from 'react';
import { Note } from '../types/note.interface';
import { NoteCollection } from '../types/noteCollection.interface';
import { noteCollections, notes } from '../services/http.service';

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
  flashVisible: boolean;
  setFlashVisible: React.Dispatch<React.SetStateAction<boolean>>;
  flashVariant: 'default' | 'success' | 'warning' | 'danger';
  flashMessage: string;
  flashCloseButton: boolean;
  handleFlash: (
    variant: 'default' | 'success' | 'warning' | 'danger',
    message: string,
    closeButton?: boolean
  ) => void;
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

  const [flashVisible, setFlashVisible] = useState(false);
  const [flashVariant, setFlashVariant] = useState<
    'default' | 'success' | 'warning' | 'danger'
  >('default');
  const [flashMessage, setFlashMessage] = useState('');
  const [flashCloseButton, setFlashCloseButton] = useState(false);

  const handleFlash = (
    variant: 'default' | 'success' | 'warning' | 'danger',
    message: string,
    closeButton?: boolean
  ) => {
    setFlashVisible(true);
    setFlashVariant(variant);
    setFlashMessage(message);
    setFlashCloseButton(closeButton || false);

    setTimeout(() => {
      setFlashVisible(false);
    }, 10000);
  };

  return (
    <GeneralContext.Provider
      value={{
        notesData,
        setNotesData,
        noteCollectionsData,
        setNoteCollectionsData,
        loading,
        setLoading,
        flashVisible,
        setFlashVisible,
        flashVariant,
        flashMessage,
        flashCloseButton,
        handleFlash,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
