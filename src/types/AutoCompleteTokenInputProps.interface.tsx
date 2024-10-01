import { Note } from './note.interface';

export interface AutoCompleteTokenInputProps {
  initialNotes?: Note[];
  onNotesChange: (newNotes: Note[]) => void;
}
