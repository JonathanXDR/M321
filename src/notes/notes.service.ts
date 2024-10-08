import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Note, Prisma } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    where: Prisma.NoteWhereInput;
    include: Prisma.NoteInclude;
  }): Promise<Note[]> {
    const { where, include } = params;
    return this.prisma.note.findMany({
      where,
      include,
    });
  }

  async findOne(params: {
    req: any;
    where: Prisma.NoteWhereUniqueInput;
    include: Prisma.NoteInclude;
  }): Promise<Note> {
    const { req, where, include } = params;
    const note = await this.prisma.note.findUnique({
      where,
      include,
    });
    if (!note || note.NoteCollection.userId !== req.user.id) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async createNote(params: {
    req: any;
    where: Prisma.NoteWhereUniqueInput;
    data: Prisma.NoteCreateInput;
  }): Promise<Note> {
    const { req, where, data } = params;
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where,
    });
    if (!noteCollection || noteCollection.userId !== req.user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return this.prisma.note.create({
      data,
    });
  }

  async updateNote(params: {
    req: any;
    where: Prisma.NoteWhereUniqueInput;
    data: Prisma.NoteUpdateInput;
    include: Prisma.NoteInclude;
  }): Promise<Note> {
    const { req, where, data, include } = params;
    const note = await this.prisma.note.findUnique({
      where,
      include,
    });
    if (!note || note.NoteCollection.userId !== req.user.id) {
      throw new NotFoundException('Note not found');
    }
    return this.prisma.note.update({
      where,
      data,
    });
  }

  async deleteNote(params: {
    req: any;
    where: Prisma.NoteWhereUniqueInput;
    include: Prisma.NoteInclude;
  }): Promise<Note> {
    const { req, where, include } = params;
    const note = await this.prisma.note.findUnique({
      where,
      include,
    });
    if (!note || note.NoteCollection.userId !== req.user.id) {
      throw new NotFoundException('Note not found');
    }
    return this.prisma.note.delete({
      where,
    });
  }
}
