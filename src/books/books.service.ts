import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  //create a private property that can only be accessed within the class.
  private readonly books: Book[] = [];

  getAll(): Book[] {
    return this.books;
  }

  getOne(id: number): Book {
    return this.books.find((book) => book.id === id);
  }

  postOne(book: Book) {
    this.books.push(book);
  }

  putOne(id: number, book: Book) {
    const index = this.books.findIndex((book) => book.id === id);
    this.books[index] = book;
  }

  deleteOne(id: number) {
    this.books.filter((book) => book.id !== id);
  }
}
