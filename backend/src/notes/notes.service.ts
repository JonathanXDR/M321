import { Injectable, NotFoundException } from '@nestjs/common';
import { Note, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { NoteRequest } from './dto/note.request';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Finds all notes for a user.
   * @param user - The user object.
   * @returns An array of notes.
   */
  async findMany(user: User): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: { userId: user.id },
    });
  }

  /**
   * Finds a note by its ID.
   * @param user - The user object.
   * @param id - The ID of the note.
   * @returns The note object.
   */
  async findOne(user: User, id: string): Promise<Note> {
    return this.getNote(user, id);
  }

  /**
   * Creates a new note.
   * @param user - The user object.
   * @param body - The note request object.
   * @returns The note object.
   */
  async createNote(user: User, body: NoteRequest): Promise<Note> {
    if (body.noteCollectionId) {
      await this.validateNoteCollection(user, body.noteCollectionId);
    }
    return this.prisma.note.create({
      data: { ...body, userId: user.id } as Note,
    });
  }

  /**
   * Updates an existing note.
   * @param user - The user object.
   * @param id - The ID of the note.
   * @param body - The note request object.
   * @returns The note object.
   */
  async updateNote(user: User, id: string, body: NoteRequest): Promise<Note> {
    if (body.noteCollectionId) {
      await this.validateNoteCollection(user, body.noteCollectionId);
    }
    return this.prisma.note.update({
      where: { id },
      data: { ...body, userId: user.id } as Note,
    });
  }

  /**
   * Deletes a note by its ID.
   * @param user - The user object.
   * @param id - The ID of the note.
   * @returns The note object.
   */
  async deleteNote(user: User, id: string): Promise<Note> {
    return this.prisma.note.delete({
      where: { id },
    });
  }

  /**
   *  Helper function to get a note by its ID.
   * @param user - The user object.
   * @param id - The ID of the note.
   * @returns The note object.
   */
  private async getNote(user: User, id: string): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note || note.userId !== user.id) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  /**
   * Helper function to validate a note collection.
   * @param user - The user object.
   * @param id - The ID of the note collection
   * @returns A promise that resolves if the note collection is valid.
   */
  private async validateNoteCollection(user: User, id: string): Promise<void> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
    });

    if (!noteCollection || noteCollection.userId !== user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
  }
}
