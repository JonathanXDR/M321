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
import { BooksService } from './books.service';
import { Book as BookModel } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from './book.entity';

@Controller()
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('books')
  @ApiOkResponse({ type: [BookEntity] })
  async getAllBooks(): Promise<BookModel[]> {
    return this.booksService.findMany({});
  }

  @Get('books/:id')
  @ApiOkResponse({ type: BookEntity })
  async getBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    return this.booksService.findOne(id);
  }

  @Post('books')
  @ApiCreatedResponse({ type: BookEntity })
  async createBook(@Body() data: BookModel): Promise<BookModel> {
    return this.booksService.createBook(data);
  }

  @Put('books/:id')
  @ApiOkResponse({ type: BookEntity })
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: BookModel,
  ): Promise<BookModel> {
    return this.booksService.updateBook({ where: { id: id }, data: data });
  }

  @Delete('books/:id')
  @ApiOkResponse({ type: BookEntity })
  async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    return this.booksService.deleteBook({ id: id });
  }
}
