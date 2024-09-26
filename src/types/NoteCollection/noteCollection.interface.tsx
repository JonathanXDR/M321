import { Note } from '../Note/note.interface';
import { User } from '../user.interface';

export interface NoteCollection {
  id: string;
  title: string;
  notes: Note[];
  user: User;
  userId: string;
}
