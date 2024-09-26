import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Book, Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findOne(id) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }): Promise<Book[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async updateBook(params: {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }): Promise<Book> {
    const { data, where } = params;
    const book = await this.findOne(params.where.id);
    if (!book) {
      throw new NotFoundException();
    }
    return this.prisma.book.update({
      data,
      where,
    });
  }

  async deleteBook(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    const book = await this.findOne(where.id);
    if (!book) {
      throw new NotFoundException();
    }
    return this.prisma.book.delete({
      where,
    });
  }
}
