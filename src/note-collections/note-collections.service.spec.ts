import { Test, TestingModule } from '@nestjs/testing';
import { NoteCollectionsController } from './note-collections.controller';
import { NoteCollectionsService } from './note-collections.service';
import { NoteCollection } from '@prisma/client';
import { User } from '@prisma/client';
import { NoteCollectionRequest } from './dto/note-collection.request';

describe('NoteCollectionsController', () => {
  let controller: NoteCollectionsController;
  let service: NoteCollectionsService;

  // Updated mock user data to include missing properties
  const mockUser: User = {
    id: '1',
    username: 'testuser',
    password: 'testpass',
    firstName: 'Test',
    lastName: 'User',
    age: 25,
    gender: null, // or 'male'/'female' depending on your application
    role: 'user', // or whatever role you define
  };

  // Mock note collection data
  const mockNoteCollection: NoteCollection = {
    id: '1',
    userId: mockUser.id,
    title: 'Test Collection',
  };

  // Mock request data for creating/updating a note collection
  const mockNoteCollectionRequest: NoteCollectionRequest = {
    title: 'Test Collection',
    notes: [], // Assuming notes are optional and can be an empty array
  };

  // Mocked service implementation
  const mockNoteCollectionsService = {
    findMany: jest.fn().mockResolvedValue([mockNoteCollection]),
    findOne: jest.fn().mockResolvedValue(mockNoteCollection),
    createNoteCollection: jest.fn().mockResolvedValue(mockNoteCollection),
    updateNoteCollection: jest.fn().mockResolvedValue(mockNoteCollection),
    deleteNoteCollection: jest.fn().mockResolvedValue(mockNoteCollection),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteCollectionsController],
      providers: [
        {
          provide: NoteCollectionsService,
          useValue: mockNoteCollectionsService,
        },
      ],
    }).compile();

    controller = module.get<NoteCollectionsController>(
      NoteCollectionsController,
    );
    service = module.get<NoteCollectionsService>(NoteCollectionsService);
  });

  describe('getAllNoteCollections', () => {
    it('should return an array of note collections', async () => {
      const result = await controller.getAllNoteCollections(mockUser);
      expect(result).toEqual([mockNoteCollection]);
      expect(service.findMany).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('getNoteCollection', () => {
    it('should return a note collection', async () => {
      const result = await controller.getNoteCollection(mockUser, '1');
      expect(result).toEqual(mockNoteCollection);
      expect(service.findOne).toHaveBeenCalledWith(mockUser, '1');
    });
  });

  describe('createNoteCollection', () => {
    it('should create and return a note collection', async () => {
      const result = await controller.createNoteCollection(
        mockUser,
        mockNoteCollectionRequest,
      );
      expect(result).toEqual(mockNoteCollection);
      expect(service.createNoteCollection).toHaveBeenCalledWith(
        mockUser,
        mockNoteCollectionRequest,
      );
    });
  });

  describe('updateNoteCollection', () => {
    it('should update and return a note collection', async () => {
      const result = await controller.updateNoteCollection(
        mockUser,
        '1',
        mockNoteCollectionRequest,
      );
      expect(result).toEqual(mockNoteCollection);
      expect(service.updateNoteCollection).toHaveBeenCalledWith(
        mockUser,
        '1',
        mockNoteCollectionRequest,
      );
    });
  });

  describe('deleteNoteCollection', () => {
    it('should delete and return a note collection', async () => {
      const result = await controller.deleteNoteCollection(mockUser, '1');
      expect(result).toEqual(mockNoteCollection);
      expect(service.deleteNoteCollection).toHaveBeenCalledWith(mockUser, '1');
    });
  });
});
