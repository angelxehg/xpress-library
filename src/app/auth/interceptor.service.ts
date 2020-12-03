import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  skipUrls = ['/auth/login', '/auth/register'];

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    const skip = this.skipUrls.some(url => request.url.includes(url));
    if (skip) {
      return next.handle(request);
    }
    const token = this.auth.token();
    if (!token) {
      throw { error: { message: 'No ha iniciado sesión' } };
    }
    request = req.clone({
      setHeaders: { authorization: `${token}` }
    });
    return next.handle(request);
  }
}
