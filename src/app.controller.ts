import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book as BookModel } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly bookService: BookService) {}

  @Get('books')
  async getAllBooks(): Promise<BookModel[]> {
    return this.bookService.books({});
  }

  @Get('books/:id')
  async getBook(@Param('id') id: string): Promise<BookModel> {
    try {
      return this.bookService.book({ id: Number(id) });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('books')
  async createBook(@Body() data: any): Promise<BookModel> {
    return this.bookService.createBook(data);
  }

  @Put('books/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<BookModel> {
    try {
      return this.bookService.updateBook({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete('books/:id')
  async deleteBook(@Param('id') id: string): Promise<BookModel> {
    try {
      return this.bookService.deleteBook({ id: Number(id) });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
