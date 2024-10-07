import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Note, Prisma } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findOne(params: {
    req: any;
    where: Prisma.NoteWhereUniqueInput;
    include?: Prisma.NoteInclude;
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

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NoteWhereUniqueInput;
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.NoteOrderByWithRelationInput;
    include?: Prisma.NoteInclude;
  }): Promise<Note[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.note.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
    return this.prisma.note.create({
      data,
    });
  }

  async updateNote(params: {
    where: Prisma.NoteWhereUniqueInput;
    data: Prisma.NoteUpdateInput;
  }): Promise<Note> {
    const { where, data } = params;
    return this.prisma.note.update({
      where,
      data,
    });
  }

  async deleteNote(where: Prisma.NoteWhereUniqueInput): Promise<Note> {
    return this.prisma.note.delete({
      where,
    });
  }
}
