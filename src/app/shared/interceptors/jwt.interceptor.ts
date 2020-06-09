import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(request.url.startsWith(environment.apiUrl)){
    //here you can send ur header
    request = request.clone({
      setHeaders:{
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFiaGFyd29ya3MuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE1ODk0ODM3NTgsImV4cCI6MTU4OTQ4NzM1OH0.H3aIdtt_6ntv-vsePzk8vLc3TBcF9RgjDe4JLHvpoCE`
    
      }
    });
  }
    
    return next.handle(request);
  }
}
