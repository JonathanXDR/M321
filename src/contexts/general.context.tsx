import React, { createContext, useContext, useState } from 'react';
import { Note } from '../types/note.interface';
import { NoteCollection } from '../types/noteCollection.interface';
import { Icon } from '@primer/octicons-react';
import { noteCollections, notes } from '../services/http.service';

interface GeneralProviderProps extends React.PropsWithChildren<{}> {}
interface GeneralContextData {
  notesData: Note[];
  noteCollectionsData: NoteCollection[];
  loading: boolean;
  fetchAllData: () => Promise<void>;
  flashVisible: boolean;
  setFlashVisible: React.Dispatch<React.SetStateAction<boolean>>;
  flashVariant: 'default' | 'success' | 'warning' | 'danger';
  flashMessage: string;
  flashIcon: Icon | null;
  flashCloseButton: boolean;
  handleFlash: (
    variant: 'default' | 'success' | 'warning' | 'danger',
    message: string,
    icon?: Icon,
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
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllData = async () => {
    const allNotesResponse = await notes.getAll();
    setNotesData(allNotesResponse.data);

    const allNoteCollectionsResponse = await noteCollections.getAll();
    setNoteCollectionsData(allNoteCollectionsResponse.data);

    setLoading(false);
  };

  const [flashVisible, setFlashVisible] = useState(false);
  const [flashVariant, setFlashVariant] = useState<
    'default' | 'success' | 'warning' | 'danger'
  >('default');
  const [flashMessage, setFlashMessage] = useState('');
  const [flashIcon, setFlashIcon] = useState<Icon | null>(null);
  const [flashCloseButton, setFlashCloseButton] = useState(false);

  const handleFlash = (
    variant: 'default' | 'success' | 'warning' | 'danger',
    message: string,
    icon?: Icon,
    closeButton?: boolean
  ) => {
    setFlashVisible(true);
    setFlashVariant(variant);
    setFlashMessage(message);
    setFlashIcon(icon || null);
    setFlashCloseButton(closeButton || false);

    setTimeout(() => {
      setFlashVisible(false);
    }, 10000);
  };

  return (
    <GeneralContext.Provider
      value={{
        notesData,
        noteCollectionsData,
        loading,
        fetchAllData,
        flashVisible,
        setFlashVisible,
        flashVariant,
        flashMessage,
        flashIcon,
        flashCloseButton,
        handleFlash,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
