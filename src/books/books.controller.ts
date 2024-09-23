import { BookDto } from './dto/book.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  // Used to inject the BooksService into the controller
  constructor(private booksService: BooksService) {}

  @Get()
  async getAll(): Promise<BookDto[]> {
    return this.booksService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<BookDto> {
    return this.booksService.getOne(id);
  }

  @Post()
  async postOne(@Body() bookDto: BookDto) {
    this.booksService.postOne(bookDto);
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() bookDto: BookDto) {
    this.booksService.putOne(id, bookDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    this.booksService.deleteOne(id);
  }
}
