import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err);
      //here you can handle ur error
      if([401, 403].indexOf(err.status) !== -1)
      {
       this.router.navigate(['../auth']);
       
      }
      return throwError(err);
    })) ;
  }
}
