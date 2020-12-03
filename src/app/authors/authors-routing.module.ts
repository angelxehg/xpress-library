import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorsComponent } from './authors.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent,
    children: [
      {
        path: 'new',
        component: AuthorDetailsComponent
      },
      {
        path: ':id',
        component: AuthorDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule { }
