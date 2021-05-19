import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication_service/authentication.service';
import { LoginstateService } from '../login_state/loginstate.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private loginstate:LoginstateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const tokenizedReq: string = JSON.parse(localStorage.getItem('token')+'')?.token; 

    console.log("interception in progress");
    
    const authToken = this.loginstate.getLoginState();
    // const authToken = localStorage.getItem('token');
    
    if (authToken) {
      const cloned = req.clone({headers:req.headers.set("Authorization", "Bearer " + authToken.token)});
      return next.handle(cloned);
    }
    else{
      return next.handle(req);
    }
  }
}
