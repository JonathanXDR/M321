import { Note } from './note.interface';
import { NoteCollection } from './noteCollection.interface';

export interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  noteCollections: NoteCollection[];
  notes: Note[];
}
