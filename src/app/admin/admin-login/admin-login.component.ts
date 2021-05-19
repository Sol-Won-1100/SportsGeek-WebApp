import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage } from 'src/app/common/constants/error-message';
import { RA } from 'src/app/common/constants/roles';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { LoginModel } from 'src/app/common/model/login/login-model';
import { AuthenticationService } from 'src/app/common/service/authentication_service/authentication.service';
import { LoginstateService } from 'src/app/common/service/login_state/loginstate.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private loginStateService: LoginstateService) {
    loginStateService.role = RA;
  }

  ngOnInit() {
  }
}
