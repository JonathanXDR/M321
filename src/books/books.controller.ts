import { BookRequest } from './dto/book.request';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book as BookModel } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from './book.entity';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ type: [BookEntity] })
  async getAllBooks(): Promise<BookModel[]> {
    return this.booksService.findMany({});
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  async getBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    try {
      return this.booksService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  async createBook(@Body() request: BookRequest): Promise<BookModel> {
    return this.booksService.createBook(request);
  }

  @Put(':id')
  @ApiOkResponse({ type: BookEntity })
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: BookRequest,
  ): Promise<BookModel> {
    try {
      return this.booksService.updateBook({
        where: { id: id },
        data: request,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookEntity })
  async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    return this.booksService.deleteBook({ id: id });
  }
}
