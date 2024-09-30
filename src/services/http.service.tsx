import { User } from '../types/user.interface';
import { Note } from '../types/Note/note.interface';
import { NoteCollection } from '../types/NoteCollection/noteCollection.interface';
import api from './api.service';
import BlankStateSystemError from '../components/BlankState/BlankStateSystemError';

export const checkConnection = async () => {
  try {
    await api.get('/');
    return true;
  } catch (error) {
    <BlankStateSystemError httpError={error} />;
    return false;
  }
};

const users = {
  getAll: () => api.get<User[]>('/users'),
  getCurrent: () => api.get<User>('/users/me'),
  get: (id: string) => api.get<User>(`/users/${id}`),
  create: (user: Partial<User>) => api.post<User>('/users', user),
  update: (id: string, user: Partial<User>) =>
    api.put<User>(`/users/${id}`, user),
  delete: (id: string) => api.delete(`/users/${id}`),
};

const notes = {
  getAll: () => api.get<Note[]>('/notes'),
  get: (id: string) => api.get<Note>(`/notes/${id}`),
  create: (note: Partial<Note>) => api.post<Note>('/notes', note),
  update: (id: string, note: Partial<Note>) =>
    api.put<Note>(`/notes/${id}`, note),
  delete: (id: string) => api.delete(`/notes/${id}`),
};

const noteCollections = {
  getAll: () => api.get<NoteCollection[]>('/note-collections'),
  get: (id: string) => api.get<NoteCollection>(`/note-collections/${id}`),
  create: (noteCollection: Partial<NoteCollection>) =>
    api.post<NoteCollection>('/note-collections', noteCollection),
  update: (id: string, noteCollection: Partial<NoteCollection>) =>
    api.put<NoteCollection>(`/note-collections/${id}`, noteCollection),
  delete: (id: string) => api.delete(`/note-collections/${id}`),
};

export { users, notes, noteCollections };
