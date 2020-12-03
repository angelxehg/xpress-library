import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from './books.service';

export interface Author {
  _id: string;
  name: string;
  country: string;
}

export const AuthorsServiceMock = {
  items$: of([]),
  index: () => of(null).toPromise(),
  create: (author: Author) => of(null).toPromise(),
  find: (id: string) => of(null).toPromise(),
  update: (author: Author) => of(null).toPromise(),
  delete: (author: Author) => of(true).toPromise()
};

interface AuthorBookResponse {
  author: string;
  book: Book;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private api = environment.apiUrl;

  public items$ = new BehaviorSubject<Author[]>([]);

  constructor(private http: HttpClient) {
    try {
      const authors: Author[] = JSON.parse(localStorage.getItem('AUTHORS'));
      this.items$.next(authors);
    } catch (error) {
      localStorage.removeItem('AUTHORS');
    }
  }

  public index(): Promise<Author[]> {
    return this.http.get<Author[]>(`${this.api}/authors`).pipe(
      map(data => {
        this.items$.next(data);
        localStorage.setItem('AUTHORS', JSON.stringify(data));
        return data;
      })
    ).toPromise();
  }

  public create(author: Author): Promise<Author> {
    return this.http.post<Author>(`${this.api}/authors`, author).toPromise();
  }

  public find(id: string): Promise<Author> {
    return this.http.get<Author>(`${this.api}/authors/${id}`).toPromise();
  }

  public update(author: Author): Promise<Author> {
    const id = author._id;
    return this.http.put<Author>(`${this.api}/authors/${id}`, author).toPromise();
  }

  public delete(author: Author): Promise<boolean> {
    const id = author._id;
    return this.http.delete(`${this.api}/authors/${id}`).pipe(
      map(r => true)
    ).toPromise();
  }

  public indexBooks(id: string): Promise<Book[]> {
    return this.http.get<AuthorBookResponse[]>(`${this.api}/authors/${id}/books`).pipe(
      map(res => res.filter(item => item.book !== null)),
      map(res => res.map(item => item.book))
    ).toPromise();
  }

  public linkBook(author: string, book: string): Promise<any> {
    return this.http.post(`${this.api}/authors/${author}/books`, { book }).toPromise();
  }


  public removeBook(author: string, book: string): Promise<boolean> {
    return this.http.delete(`${this.api}/authors/${author}/books/${book}`).pipe(
      map(r => true)
    ).toPromise();
  }
}
