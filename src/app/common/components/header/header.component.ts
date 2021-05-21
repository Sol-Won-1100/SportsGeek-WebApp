import { Input } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { RA, RU } from '../../constants/roles';
import { LoginStateModel } from '../../model/login/LoginStateModel';
import { AuthenticationService } from '../../service/authentication_service/authentication.service';
import { LoginstateService } from '../../service/login_state/loginstate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() deviceXs!:boolean;
  // isAuthenticated = false;
  constructor(
    public authservice1: AuthenticationService,
    public loginStateService2: LoginstateService,
    private router: Router
  ) { }

  ngOnInit() { }

  logout() {
    this.loginStateService2.destroySession(this.loginStateService2.role);
    this.router.navigate(['']);
  }

  isRoleAdmin() {
    const loginState: LoginStateModel = this.loginStateService2.getLoginState();
    return loginState != null && loginState.role === RA;
  }

  isRoleUser() {
    const loginState: LoginStateModel = this.loginStateService2.getLoginState();
    return loginState != null && loginState.role === RU;
  }

  goToHome()
  {
    const loginState: LoginStateModel = this.loginStateService2.getLoginState();
    if (loginState != null && loginState.role === RU) {
      this.router.navigate(['/User/home'])
    }else{
      this.router.navigate(['/Admin/home']);
    }
  }
}
