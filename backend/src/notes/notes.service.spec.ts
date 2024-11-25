import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note, User } from '@prisma/client';
import { NoteRequest } from './dto/note.request';

const mockUser = {
  id: '1',
  username: 'testuser',
  password: 'hashedpassword',
  firstName: 'Test',
  lastName: 'User',
  age: 25,
  gender: 'male',
  role: 'admin',
} as User;

const mockNote: Note = {
  id: '1',
  title: 'Test Note',
  content: 'This is a test note.',
  userId: '1',
  noteCollectionId: '1',
} as Note;

const mockNotesService = {
  findMany: jest.fn().mockResolvedValue([mockNote]),
  findOne: jest.fn().mockResolvedValue(mockNote),
  createNote: jest.fn().mockResolvedValue(mockNote),
  updateNote: jest.fn().mockResolvedValue(mockNote),
  deleteNote: jest.fn().mockResolvedValue(mockNote),
};

describe('NotesController', () => {
  let controller: NotesController;
  let notesService: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: mockNotesService,
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    notesService = module.get<NotesService>(NotesService);
  });

  describe('getAllNotes', () => {
    it('should return an array of notes', async () => {
      const result = await controller.getAllNotes(mockUser);
      expect(result).toEqual([mockNote]);
      expect(notesService.findMany).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('getNote', () => {
    it('should return a note by id', async () => {
      const result = await controller.getNote(mockUser, mockNote.id);
      expect(result).toEqual(mockNote);
      expect(notesService.findOne).toHaveBeenCalledWith(mockUser, mockNote.id);
    });
  });

  describe('createNote', () => {
    it('should create a note', async () => {
      const noteRequest: NoteRequest = {
        title: 'New Note',
        content: 'New content',
        noteCollectionId: '1',
      };
      const result = await controller.createNote(mockUser, noteRequest);
      expect(result).toEqual(mockNote);
      expect(notesService.createNote).toHaveBeenCalledWith(
        mockUser,
        noteRequest,
      );
    });
  });

  describe('updateNote', () => {
    it('should update a note', async () => {
      const noteRequest: NoteRequest = {
        title: 'Updated Note',
        content: 'Updated content',
        noteCollectionId: '1',
      };
      const result = await controller.updateNote(
        mockUser,
        mockNote.id,
        noteRequest,
      );
      expect(result).toEqual(mockNote);
      expect(notesService.updateNote).toHaveBeenCalledWith(
        mockUser,
        mockNote.id,
        noteRequest,
      );
    });
  });

  describe('deleteNote', () => {
    it('should delete a note by id', async () => {
      const result = await controller.deleteNote(mockUser, mockNote.id);
      expect(result).toEqual(mockNote);
      expect(notesService.deleteNote).toHaveBeenCalledWith(
        mockUser,
        mockNote.id,
      );
    });
  });
});
