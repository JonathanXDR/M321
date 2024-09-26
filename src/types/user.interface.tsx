import { Note } from './Note/note.interface';
import { NoteCollection } from './NoteCollection/noteCollection.interface';

export interface User {
  id: string;
  username: string;
  password: string;
  lastname: string;
  firstname: string;
  age: number;
  gender: string;
  noteCollections: NoteCollection[];
  notes: Note[];
}
