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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from './book.entity';

@Controller()
@ApiTags('books')
export class AppController {
  constructor(private readonly bookService: BookService) {}

  @Get('books')
  @ApiOkResponse({ type: [BookEntity] })
  async getAllBooks(): Promise<BookModel[]> {
    return this.bookService.findMany({});
  }

  @Get('books/:id')
  @ApiOkResponse({ type: BookEntity })
  async getBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    return this.bookService.findOne(id);
  }

  @Post('books')
  @ApiCreatedResponse({ type: BookEntity })
  async createBook(@Body() data: BookModel): Promise<BookModel> {
    return this.bookService.createBook(data);
  }

  @Put('books/:id')
  @ApiOkResponse({ type: BookEntity })
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: BookModel,
  ): Promise<BookModel> {
    return this.bookService.updateBook({ where: { id: id }, data: data });
  }

  @Delete('books/:id')
  @ApiOkResponse({ type: BookEntity })
  async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    return this.bookService.deleteBook({ id: id });
  }
}
