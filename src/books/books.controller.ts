import { UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
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
import { Book } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from './book.entity';

@UseGuards(JwtAuthGuard)
@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ type: [BookEntity] })
  async getAllBooks(@Request() req): Promise<Book[]> {
    return this.booksService.findMany({});
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  async getBook(
    @Request() req,
    @Param('id', ParseIntPipe) id: string,
  ): Promise<Book> {
    try {
      return this.booksService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  async createBook(
    @Request() req,
    @Body() request: BookRequest,
  ): Promise<Book> {
    return this.booksService.createBook(request);
  }

  @Put(':id')
  @ApiOkResponse({ type: BookEntity })
  async updateBook(
    @Request() req,
    @Param('id', ParseIntPipe) id: string,
    @Body() request: BookRequest,
  ): Promise<Book> {
    try {
      return this.booksService.updateBook({
        where: { id },
        data: request,
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookEntity })
  async deleteBook(@Param('id', ParseIntPipe) id: string): Promise<Book> {
    return this.booksService.deleteBook({ id });
  }
}
