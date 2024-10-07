import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NoteCollection, Prisma } from '@prisma/client';

@Injectable()
export class NoteCollectionsService {
  constructor(private prisma: PrismaService) {}

  async findOne(params: {
    req: any;
    where: Prisma.NoteCollectionWhereUniqueInput;
    include?: Prisma.NoteCollectionInclude;
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

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NoteCollectionWhereUniqueInput;
    where?: Prisma.NoteCollectionWhereInput;
    orderBy?: Prisma.NoteCollectionOrderByWithRelationInput;
    include?: Prisma.NoteCollectionInclude;
  }): Promise<NoteCollection[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.noteCollection.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
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
    const { where, data } = params;
    return this.prisma.noteCollection.update({
      where,
      data,
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
