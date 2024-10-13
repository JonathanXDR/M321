import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Note, NoteCollection, Prisma, User } from '@prisma/client';
import { NoteCollectionRequest } from './dto/noteCollection.request';

@Injectable()
export class NoteCollectionsService {
  constructor(private prisma: PrismaService) {}

  async findMany(user: User): Promise<NoteCollection[]> {
    return this.prisma.noteCollection.findMany({
      where: { userId: user.id },
      include: { notes: true },
    });
  }

  async findOne(user: User, id: string): Promise<NoteCollection> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
      include: { notes: true },
    });
    if (!noteCollection || noteCollection.userId !== user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return noteCollection;
  }

  async createNoteCollection(
    user: User,
    body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    return this.prisma.noteCollection.create({
      data: { ...body, userId: user.id } as NoteCollection,
    });
  }

  async updateNoteCollection(
    user: User,
    id: string,
    body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
    });
    if (!noteCollection || noteCollection.userId !== user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return this.prisma.noteCollection.update({
      where: { id },
      data: { ...body, userId: user.id } as NoteCollection,
    });
  }

  async deleteNoteCollection(
    user: User,
    id: string,
  ): Promise<NoteCollection & { notes: Note[] }> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
      include: { notes: true },
    });
    if (!noteCollection || noteCollection.userId !== user.id) {
      throw new NotFoundException('NoteCollection not found');
    }

    await this.prisma.note.deleteMany({
      where: { noteCollectionId: id },
    });

    await this.prisma.noteCollection.delete({
      where: { id },
    });

    return noteCollection;
  }
}
