import { BookDto } from './dto/book.dto';
import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class CatsController {
  // Used to inject the BooksService into the controller.
  constructor(private booksService: BooksService) {}

  @Get()
  findAll(): string {
    return 'This action returns all books';
  }

  @Get(':id')
  findOne(): string {
    return 'This action returns a book';
  }

  @Post()
  // The @Body() decorator extracts the data from the request body and passes it to the create() method.
  async create(@Body() createCatDto: BookDto) {
    this.booksService.create(createCatDto);
  }

  @Put(':id')
  updateOne(): string {
    return 'This action updates a book';
  }

  @Delete(':id')
  deleteOne(): string {
    return 'This action removes a book';
  }
}
