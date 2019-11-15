import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../../models/book';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.scss']
})
export class AdminBookComponent implements OnInit {
  book: Book = { title: '', author: '', price: 0, reviews: 0, rating: 5 };
  isNew: boolean = true;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe((params: Params) => {
      this.loadBookByParams(params);
    });
  }

  loadBookByParams(params: Params) {
    const id = params.id;
    if (id) {
      this.bookService.getBookById(parseInt(id)).subscribe((book: Book) => {
        this.book = book;
        this.isNew = false;
      });
    }
  }

  saveBook(form: NgForm) {
    if (form.valid) {
      if (this.isNew) {
        this.createBook();
      } else {
        this.updateBook();
      }
    }
  }

  createBook() {
    this.bookService.createBook(this.book).subscribe(() => {
      this.router.navigateByUrl('/admin-books')
    });
  }

  updateBook() {
    this.bookService.updateBook(this.book).subscribe(() => {
      this.router.navigateByUrl('/admin-books')
    });
  }
}
