import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminBooksRoutingModule } from './admin-books-routing.module';
import { AdminBooksComponent } from './admin-books.component';
import { AdminBookComponent } from './admin-book/admin-book.component';


@NgModule({
  declarations: [AdminBooksComponent, AdminBookComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminBooksRoutingModule
  ]
})
export class AdminBooksModule { }
