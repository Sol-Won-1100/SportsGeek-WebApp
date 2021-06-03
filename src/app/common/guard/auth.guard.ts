import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RU } from '../constants/roles';
import { LoginStateModel } from '../model/login/LoginStateModel';
import { AuthenticationService } from '../service/authentication_service/authentication.service';
import { LoginstateService } from '../service/login_state/loginstate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginStateService: LoginstateService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const role = route.data.roles as Array<string>;
    const loginState: LoginStateModel = this.loginStateService.getLoginState();
    if (loginState == null && role[0] === RU) {
      return true;
    }
    if (!this.loginStateService.isLoginStateValidForUser(role[0])) {
      return true;
    } else{
      // this.router.navigate(['/' + role[0] + '/login']);
      this.router.navigate(['/login']);
      return false;
    }
  }

}
