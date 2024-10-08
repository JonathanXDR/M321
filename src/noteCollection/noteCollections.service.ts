import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NoteCollection, Prisma } from '@prisma/client';

@Injectable()
export class NoteCollectionsService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    where: Prisma.NoteCollectionWhereInput;
    include: Prisma.NoteCollectionInclude;
  }): Promise<NoteCollection[]> {
    const { where, include } = params;
    return this.prisma.noteCollection.findMany({
      where,
      include,
    });
  }

  async findOne(params: {
    req: any;
    where: Prisma.NoteCollectionWhereUniqueInput;
    include: Prisma.NoteCollectionInclude;
  }): Promise<NoteCollection> {
    const { req, where, include } = params;
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where,
      include,
    });
    if (!noteCollection || noteCollection.userId !== req.user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return noteCollection;
  }

  async createNoteCollection(params: {
    data: Prisma.NoteCollectionCreateInput;
  }): Promise<NoteCollection> {
    const { data } = params;
    return this.prisma.noteCollection.create({
      data,
    });
  }

  async updateNoteCollection(params: {
    req: any;
    where: Prisma.NoteCollectionWhereUniqueInput;
    data: Prisma.NoteCollectionUpdateInput;
  }): Promise<NoteCollection> {
    const { req, where, data } = params;
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where,
    });
    if (!noteCollection || noteCollection.userId !== req.user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return this.prisma.noteCollection.update({
      data,
      where,
    });
  }

  async deleteNoteCollection(params: {
    req: any;
    where: Prisma.NoteCollectionWhereUniqueInput;
  }): Promise<NoteCollection> {
    const { req, where } = params;
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where,
    });
    if (!noteCollection || noteCollection.userId !== req.user.id) {
      throw new NotFoundException('NoteCollection not found');
    }
    return this.prisma.noteCollection.delete({
      where,
    });
  }
}
