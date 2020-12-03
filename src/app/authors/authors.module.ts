import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    AuthorsRoutingModule
  ]
})
export class AuthorsModule { }
