import { Injectable } from '@angular/core';
import { LoginStateModel } from '../../model/login/LoginStateModel';

@Injectable({
  providedIn: 'root'
})
export class LoginstateService {

  role = 'User';

  constructor() { }

  createSession(loginStateModel: LoginStateModel) {
    this.role = loginStateModel.role;
    localStorage.setItem('loginState', JSON.stringify(loginStateModel));
    // localStorage.setItem('token');
  }

  destroySession(role: string) {
    localStorage.removeItem('loginState');
    // localStorage.removeItem('token');
    this.role = role;
  }

  getLoginState(): LoginStateModel {
    return JSON.parse(localStorage.getItem('loginState')+'');
  }

  isLoginStateValidForUser(currentUser: string): boolean {
    // currentUser = currentUser.toLowerCase();
    const loginState: LoginStateModel = this.getLoginState();
    if (loginState === null ||
      (loginState != null && loginState.role !== currentUser)) {
      return true;
    } else {
      return false;
    }
  }
}
