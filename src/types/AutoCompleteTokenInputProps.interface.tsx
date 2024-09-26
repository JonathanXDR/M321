import { Note } from './Note/note.interface';

export interface AutoCompleteTokenInputProps {
  initialNotes?: Note[];
  onNotesChange: (newNotes: Note[]) => void;
}
