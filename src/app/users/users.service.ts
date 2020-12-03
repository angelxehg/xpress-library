import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
  password?: string;
  passwordConfirmation?: string;
}

export const UsersServiceMock = {
  items$: of([]),
  index: () => of(null).toPromise(),
  create: (user: User) => of(null).toPromise(),
  find: (id: string) => of(null).toPromise(),
  update: (user: User) => of(null).toPromise(),
  delete: (user: User) => of(true).toPromise()
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api = environment.apiUrl;

  public items$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    try {
      const users: User[] = JSON.parse(localStorage.getItem('USERS'));
      this.items$.next(users);
    } catch (error) {
      localStorage.removeItem('USERS');
    }
  }

  private sanitize(user: User): User {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role
    };
  }

  public index(): Promise<User[]> {
    return this.http.get<User[]>(`${this.api}/auth/users`).pipe(
      map(data => {
        this.items$.next(data);
        localStorage.setItem('USERS', JSON.stringify(data));
        return data;
      })
    ).toPromise();
  }

  public create(user: User): Promise<User> {
    return this.http.post<User>(`${this.api}/auth/register`, user).toPromise();
  }

  public find(id: string): Promise<User> {
    return this.http.get<User>(`${this.api}/auth/users/${id}`).pipe(
      map(user => this.sanitize(user))
    ).toPromise();
  }

  public update(user: User): Promise<User> {
    const id = user._id;
    return this.http.put<User>(`${this.api}/auth/users/${id}`, user).pipe(
      map(updated => this.sanitize(updated))
    ).toPromise();
  }

  public delete(user: User): Promise<boolean> {
    const id = user._id;
    return this.http.delete(`${this.api}/auth/users/${id}`).pipe(
      map(r => true)
    ).toPromise();
  }
}
