import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Note } from '@prisma/client';
import { NoteRequest } from './dto/note.request';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findMany(req): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: { NoteCollection: { userId: req.user.id } },
      include: {
        NoteCollection: {
          select: {
            userId: true,
          },
        },
      },
    });
  }

  async findOne(req: any, id: string): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
      include: {
        NoteCollection: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!note || note.NoteCollection.userId !== req.user.id) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async createNote(req: any, body: NoteRequest): Promise<Note> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id: body.noteCollectionId },
    });
    if (!noteCollection || noteCollection.userId !== req.user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return this.prisma.note.create({
      data: {
        title: body.title,
        content: body.content,
        NoteCollection: {
          connect: {
            id: body.noteCollectionId,
          },
        },
      },
    });
  }

  async updateNote(
    req: any,
    id: string,
    body: { title: string; content: string },
  ): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
      include: {
        NoteCollection: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!note || note.NoteCollection.userId !== req.user.id) {
      throw new NotFoundException('Note not found');
    }
    return this.prisma.note.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
      },
    });
  }

  async deleteNote(req: any, id: string): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: { id },
      include: {
        NoteCollection: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!note || note.NoteCollection.userId !== req.user.id) {
      throw new NotFoundException('Note not found');
    }
    return this.prisma.note.delete({
      where: { id },
    });
  }
}
