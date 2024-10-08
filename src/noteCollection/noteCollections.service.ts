import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NoteCollection, Prisma } from '@prisma/client';

@Injectable()
export class NoteCollectionsService {
  constructor(private prisma: PrismaService) {}

  async findMany(req: any): Promise<NoteCollection[]> {
    return this.prisma.noteCollection.findMany({
      where: { userId: req.user.id },
      include: { notes: true },
    });
  }

  async findOne(req: any, id: string): Promise<NoteCollection> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
      include: { notes: true },
    });
    if (!noteCollection || noteCollection.userId !== req.user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return noteCollection;
  }

  async createNoteCollection(
    data: Prisma.NoteCollectionCreateInput,
  ): Promise<NoteCollection> {
    return this.prisma.noteCollection.create({
      data,
    });
  }

  async updateNoteCollection(
    req: any,
    id: string,
    body,
  ): Promise<NoteCollection> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
    });
    if (!noteCollection || noteCollection.userId !== req.user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return this.prisma.noteCollection.update({
      where: { id },
      data: { title: body.title },
    });
  }

  async deleteNoteCollection(req: any, id: string): Promise<NoteCollection> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
    });
    if (!noteCollection || noteCollection.userId !== req.user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return this.prisma.noteCollection.delete({
      where: { id },
    });
  }
}
