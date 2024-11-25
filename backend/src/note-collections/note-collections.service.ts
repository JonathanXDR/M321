import { Injectable, NotFoundException } from '@nestjs/common';
import { Note, NoteCollection, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { NoteCollectionRequest } from './dto/note-collection.request';

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
    return this.getNoteCollection(user, id);
  }

  async createNoteCollection(
    user: User,
    body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    const { notes, ...rest } = body;
    const createdNoteCollection = await this.prisma.noteCollection.create({
      data: { ...rest, userId: user.id },
      include: { notes: true },
    });

    await this.updateNotesOfNoteCollection(user, createdNoteCollection, notes);

    return this.getNoteCollection(user, createdNoteCollection.id);
  }

  async updateNoteCollection(
    user: User,
    id: string,
    body: NoteCollectionRequest,
  ): Promise<NoteCollection> {
    const { notes, ...rest } = body;
    const updatedNoteCollection = await this.prisma.noteCollection.update({
      where: { id },
      data: { ...rest, userId: user.id },
      include: { notes: true },
    });

    await this.updateNotesOfNoteCollection(user, updatedNoteCollection, notes);

    return this.getNoteCollection(user, updatedNoteCollection.id);
  }

  async deleteNoteCollection(user: User, id: string): Promise<NoteCollection> {
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

  private async getNoteCollection(
    user: User,
    id: string,
  ): Promise<NoteCollection> {
    const noteCollection = await this.prisma.noteCollection.findUnique({
      where: { id },
      include: { notes: true },
    });

    if (!noteCollection || noteCollection.userId !== user.id) {
      throw new NotFoundException('NoteCollection not found');
    }

    return noteCollection;
  }

  private async updateNotesOfNoteCollection(
    user: User,
    noteCollection: NoteCollection,
    notes?: Note[],
  ): Promise<void> {
    if (notes && notes.length > 0) {
      const noteIds = notes.map((note) => note.id);

      await this.validateNotes(user, noteIds);

      await this.prisma.note.updateMany({
        where: { noteCollectionId: noteCollection.id, userId: user.id },
        data: { noteCollectionId: null },
      });

      await this.prisma.note.updateMany({
        where: { id: { in: noteIds }, userId: user.id },
        data: { noteCollectionId: noteCollection.id },
      });
    }
  }

  private async validateNotes(user: User, noteIds: string[]): Promise<void> {
    const existingNotes = await this.prisma.note.findMany({
      where: { id: { in: noteIds }, userId: user.id },
    });

    if (existingNotes.length !== noteIds.length) {
      throw new NotFoundException('One or more notes not found');
    }
  }
}
