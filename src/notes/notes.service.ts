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
    const note = await this.prisma.note.findUnique({
      where: { id },
    });
    if (!note || note.userId !== user.id) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async createNote(user: User, body: NoteRequest): Promise<Note> {
    return this.prisma.note.create({
      data: { ...body, userId: user.id } as Note,
    });
  }

  async updateNote(user: User, id: string, body: NoteRequest): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });
    if (!note || note.userId !== user.id) {
      throw new NotFoundException('Note not found');
    }
    return this.prisma.note.update({
      where: { id },
      data: { ...body, userId: user.id } as Note,
    });
  }

  async deleteNote(user: User, id: string): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });
    if (!note || note.userId !== user.id) {
      throw new NotFoundException('Note not found');
    }
    return this.prisma.note.delete({
      where: { id },
    });
  }
}
