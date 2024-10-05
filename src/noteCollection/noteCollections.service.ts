import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NoteCollection, Prisma } from '@prisma/client';

@Injectable()
export class NoteCollectionsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id) {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
      include: { notes: true },
    });
    if (!noteCollection) {
      throw new NotFoundException('NoteCollection not found');
    }
    return noteCollection;
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NoteCollectionWhereUniqueInput;
    where?: Prisma.NoteCollectionWhereInput;
    orderBy?: Prisma.NoteCollectionOrderByWithRelationInput;
    include?: Prisma.NoteCollectionInclude;
  }): Promise<NoteCollection[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.noteCollection.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { notes: true },
    });
  }

  async createNoteCollection(
    data: Prisma.NoteCollectionCreateInput,
  ): Promise<NoteCollection> {
    return this.prisma.noteCollection.create({
      data,
    });
  }

  async updateNoteCollection(params: {
    where: Prisma.NoteCollectionWhereUniqueInput;
    data: Prisma.NoteCollectionUpdateInput;
  }): Promise<NoteCollection> {
    const { data, where } = params;
    return this.prisma.noteCollection.update({
      data,
      where,
    });
  }

  async deleteNoteCollection(
    where: Prisma.NoteCollectionWhereUniqueInput,
  ): Promise<NoteCollection> {
    return this.prisma.noteCollection.delete({
      where,
    });
  }
}
