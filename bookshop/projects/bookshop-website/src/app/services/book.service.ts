import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

const URL = 'https://immense-forest-87642.herokuapp.com/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(URL);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${URL}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(URL, book);
  }

  updateBook(book: Book): Observable<void> {
    return this.http.put<void>(`${URL}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }
}
