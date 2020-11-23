import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptorService implements HttpInterceptor{
  url: String = 'http://localhost:8080/';
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    debugger;
    if(request.url!==this.url+'login' && request.url!==this.url+'register'){
      request = request.clone({
        setHeaders: { 
          Authorization: localStorage.getItem('Authentication')
        }
      });
    }
    
    return next.handle(request);
  }
}
