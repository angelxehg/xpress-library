import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentUserComponent } from './current-user/current-user.component';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'books',
        loadChildren: () => import('../books/books.module').then(m => m.BooksModule)
      },
      {
        path: 'authors',
        loadChildren: () => import('../authors/authors.module').then(m => m.AuthorsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'me',
        component: CurrentUserComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/books',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule { }
