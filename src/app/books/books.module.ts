import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { BooksRoutingModule } from './books-routing.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BooksComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
    FontAwesomeModule
  ]
})
export class BooksModule { }
