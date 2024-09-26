import { Note } from '../Note/note.interface';
import { Token } from '../token.interface';
import { NoteCollection } from './noteCollection.interface';

export interface NoteCollectionDialogProps {
  noteCollection: NoteCollection;
  initialNotes?: Token[];
}
