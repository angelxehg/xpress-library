import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../users/users.service';

const jwt = new JwtHelperService();

export const AuthServiceMock = {
  user: () => null,
  admin: () => false,
  token: () => '',
  login: () => { },
  register: () => { },
  logout: () => { }
};

export interface Credential {
  name?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.apiUrl;

  private currentUser: User;
  private currentToken: string;

  constructor(private http: HttpClient, private router: Router) {
    this.currentToken = localStorage.getItem('JWT_TOKEN');
    if (this.currentToken) {
      this.currentUser = this.solveToken(this.currentToken);
    }
  }

  public user(): User {
    if (!this.currentUser) {
      return null;
    }
    return this.currentUser;
  }

  public admin(): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser.role === 'ROLE_ADMIN';
  }

  public token = () => this.currentToken;

  private solveToken(token: string): User {
    const decoded = jwt.decodeToken(token);
    return {
      _id: decoded.user,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      image: decoded.image
    };
  }

  public login(credential: Credential): Promise<User> {
    return this.http.post<TokenResponse>(`${this.api}/auth/login`, credential).pipe(
      map(response => {
        this.currentToken = response.token;
        this.currentUser = this.solveToken(response.token);
        localStorage.setItem('JWT_TOKEN', response.token);
        return this.currentUser;
      })
    ).toPromise();
  }

  public register(credential: Credential): Promise<User> {
    if (credential.password === '') {
      throw { error: { message: 'No ingresó una contraseña' } };
    }
    if (credential.password !== credential.passwordConfirmation) {
      throw { error: { message: 'Las contraseñas no coinciden' } };
    }
    return this.http.post<User>(`${this.api}/auth/register`, credential).toPromise();
  }

  public logout(): void {
    this.currentToken = null;
    this.currentUser = null;
    localStorage.removeItem('JWT_TOKEN');
    this.router.navigateByUrl('/auth');
  }
}
