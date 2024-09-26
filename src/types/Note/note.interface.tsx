import { NoteCollection } from '../NoteCollection/noteCollection.interface';
import { User } from '../user.interface';

export interface Note {
  id: string;
  title: string;
  content: string;
  user: User;
  userId: string;
  noteCollection?: NoteCollection;
  noteCollectionId?: string;
}
