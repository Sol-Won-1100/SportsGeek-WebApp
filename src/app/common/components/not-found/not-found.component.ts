import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RU } from '../../constants/roles';
import { LoginStateModel } from '../../model/login/LoginStateModel';
import { LoginstateService } from '../../service/login_state/loginstate.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private loginStateService: LoginstateService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  goToHome()
  {
    const loginState: LoginStateModel = this.loginStateService.getLoginState();
    if (loginState != null && loginState.role === RU) {
      this.router.navigate(['/User/home'])
    }else{
      this.router.navigate(['/Admin/home']);
    }
  }
}
