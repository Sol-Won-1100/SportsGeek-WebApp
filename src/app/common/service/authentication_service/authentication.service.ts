import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { usersBaseURL } from '../../constants/http-urls';
import { LoginModel } from '../../model/login/login-model';
import { LoginStateModel } from '../../model/login/LoginStateModel';

// let jwtlogin_api = "http://localhost:8081/users/authenticate";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async login(loginmodel: LoginModel): Promise<any> {
    return await this.http.post<LoginStateModel>(usersBaseURL + '/authenticate', loginmodel, {observe: 'response'}).toPromise();
  }
  // login(loginmodel: LoginModel, role:string): Observable<any> {
  //   // loginmodel.username = loginmodel.username + role.charAt(0).toUpperCase();
  //   return this.http.post(jwtlogin_api, loginmodel, httpOptions);
  // }

  isLoggedIn() {
    return !!localStorage.getItem('loginState');
  }

  // getToken() {
  //   let authToken = localStorage.getItem('loginState');
  //   return (authToken != null) ? true : false;
  // }

  loggedout() {
    let removeToken = localStorage.removeItem('loginState');
    if (removeToken==null) {
      this.router.navigate(['']); 
    }
  }


}
