import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book as BookModel } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly bookService: BookService) {}

  @Get('books')
  async getAllBooks(): Promise<BookModel[]> {
    return this.bookService.findMany({});
  }

  @Get('books/:id')
  async getBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    try {
      return this.bookService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('books')
  async createBook(@Body() data: BookModel): Promise<BookModel> {
    return this.bookService.createBook(data);
  }

  @Put('books/:id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: BookModel,
  ): Promise<BookModel> {
    try {
      return this.bookService.updateBook({
        where: { id: id },
        data,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete('books/:id')
  async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    try {
      return this.bookService.deleteBook({ id: id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
