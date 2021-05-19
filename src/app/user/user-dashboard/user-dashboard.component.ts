import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RU } from 'src/app/common/constants/roles';
import { LoginstateService } from 'src/app/common/service/login_state/loginstate.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private loginStateService: LoginstateService,
    private router: Router
    ) { 
      loginStateService.role = RU;
    }

  ngOnInit(): void {
  }

}
