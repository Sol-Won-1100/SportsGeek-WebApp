import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingComponent } from '../common/components/loading/loading.component';
import { SnackbarComponent } from '../common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from '../common/constants/error-message';
import { getSnackbarProperties } from '../common/constants/snackbar-properties';
import { LoginModel } from '../common/model/login/login-model';
import { LoginStateModel } from '../common/model/login/LoginStateModel';
import { AuthenticationService } from '../common/service/authentication_service/authentication.service';
import { LoginstateService } from '../common/service/login_state/loginstate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() userType!: string;
  loginform!: FormGroup;
  hide = true;

  isLoggedIn = false;
  // isLoginFailed = false;

  // errorMessage!: '';

  constructor(
    private fb: FormBuilder,
    public authservice2: AuthenticationService,
    private router: Router,
    private loginStateService: LoginstateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    const loginStateModel: LoginStateModel = this.loginStateService.getLoginState();
    if (loginStateModel !== null) {
      this.router.navigate(['/' + loginStateModel.role + '/home']);
      return;
    }
    this.loginform = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    // if (localStorage.getItem('token')) {
    //   this.router.navigate(['/adminHome']);
    // }
  }

  get form() {
    return this.loginform.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  async login() {
    if (this.loginform.valid) {
      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      let loginStateModel: LoginStateModel;
      const loginModel: LoginModel = new LoginModel(this.form.username.value, this.form.password.value);
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      try {
        const resp = await this.authservice2.login(loginModel);
        loginStateModel = resp.body;
        if (loginStateModel != null) {
          if (loginStateModel.role === 'Admin' || loginStateModel.status) {
            this.loginStateService.createSession(loginStateModel);
            // localStorage.setItem('token', resp.body.token);
            // localStorage.setItem('userId', resp.body.data.userId);
            const url: any = ['/' + this.loginStateService.getLoginState().role + '/home'];
            this.router.navigate(url);
          } else {
            if (this.loginStateService.role === 'User') {
              snackbarMsg = 'sorry you are not verified yet or you have been blocked! please contact the admin';
            } else {
              snackbarMsg = 'sorry you have been blocked! please contact the admin';
            }
            panelClass = 'red';
          }
        } else {
          snackbarMsg = NO_RESP;
          panelClass = 'red';
        }
      } catch (ex) {
        snackbarMsg = getErrorMessage(ex, 'login');
        panelClass = 'red';
      } finally {
        dialogRef.close();
      }
      if (snackbarMsg) {
        snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
          getSnackbarProperties(snackbarMsg, panelClass));
      }
    }
  }


}
