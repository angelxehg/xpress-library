import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author } from '../authors/authors.service';

export interface Book {
  _id: string;
  title: string;
}

interface AuthorBookResponse {
  author: Author;
  book: string;
}

export const BooksServiceMock = {
  items$: of([]),
  index: () => of(null).toPromise(),
  create: (book: Book) => of(null).toPromise(),
  find: (id: string) => of(null).toPromise(),
  update: (book: Book) => of(null).toPromise(),
  delete: (book: Book) => of(true).toPromise()
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private api = environment.apiUrl;

  public items$ = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {
    try {
      const books: Book[] = JSON.parse(localStorage.getItem('BOOKS'));
      this.items$.next(books);
    } catch (error) {
      localStorage.removeItem('BOOKS');
    }
  }

  public index(): Promise<Book[]> {
    return this.http.get<Book[]>(`${this.api}/books`).pipe(
      map(data => {
        this.items$.next(data);
        localStorage.setItem('BOOKS', JSON.stringify(data));
        return data;
      })
    ).toPromise();
  }

  public create(book: Book): Promise<Book> {
    return this.http.post<Book>(`${this.api}/books`, book).toPromise();
  }

  public find(id: string): Promise<Book> {
    return this.http.get<Book>(`${this.api}/books/${id}`).toPromise();
  }

  public update(book: Book): Promise<Book> {
    const id = book._id;
    return this.http.put<Book>(`${this.api}/books/${id}`, book).toPromise();
  }

  public delete(book: Book): Promise<boolean> {
    const id = book._id;
    return this.http.delete(`${this.api}/books/${id}`).pipe(
      map(r => true)
    ).toPromise();
  }

  public indexAuthors(id: string): Promise<Author[]> {
    return this.http.get<AuthorBookResponse[]>(`${this.api}/books/${id}/authors`).pipe(
      map(res => res.filter(item => item.author !== null)),
      map(res => res.map(item => item.author))
    ).toPromise();
  }

  public linkAuthor(book: string, author: string): Promise<any> {
    return this.http.post(`${this.api}/books/${book}/authors`, { author }).toPromise();
  }

  public removeAuthor(book: string, author: string): Promise<boolean> {
    return this.http.delete(`${this.api}/books/${book}/authors/${author}`).pipe(
      map(r => true)
    ).toPromise();
  }
}
