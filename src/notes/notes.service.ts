import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Note, User } from '@prisma/client';
import { NoteRequest } from './dto/note.request';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findMany(user: User): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: { userId: user.id },
    });
  }

  async findOne(user: User, id: string): Promise<Note> {
    return this.getNote(user, id);
  }

  async createNote(user: User, body: NoteRequest): Promise<Note> {
    if (body.noteCollectionId) {
      await this.validateNoteCollection(user, body.noteCollectionId);
    }
    return this.prisma.note.create({
      data: { ...body, userId: user.id } as Note,
    });
  }

  async updateNote(user: User, id: string, body: NoteRequest): Promise<Note> {
    if (body.noteCollectionId) {
      await this.validateNoteCollection(user, body.noteCollectionId);
    }
    return this.prisma.note.update({
      where: { id },
      data: { ...body, userId: user.id } as Note,
    });
  }

  async deleteNote(user: User, id: string): Promise<Note> {
    return this.prisma.note.delete({
      where: { id },
    });
  }

  private async getNote(user: User, id: string): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note || note.userId !== user.id) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  private async validateNoteCollection(user: User, id: string): Promise<void> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
    });

    if (!noteCollection || noteCollection.userId !== user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
  }
}
