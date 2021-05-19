import { Component, OnInit } from '@angular/core';
import { RU } from 'src/app/common/constants/roles';
import { LoginstateService } from 'src/app/common/service/login_state/loginstate.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private loginStateService: LoginstateService) {
    loginStateService.role = RU;
  }
  ngOnInit(): void {
  }

}
