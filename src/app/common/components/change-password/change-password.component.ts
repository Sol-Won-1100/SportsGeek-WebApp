import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getErrorMessage, NO_RESP } from '../../constants/error-message';
import { getSnackbarProperties } from '../../constants/snackbar-properties';
import { NewPasswordModel } from '../../model/change-password/NewPassword';
import { AdminService } from '../../service/admin_service/admin.service';
import { LoginstateService } from '../../service/login_state/loginstate.service';
import { UserService } from '../../service/user_service/user.service';
import { LoadingComponent } from '../loading/loading.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  hide=true;

  constructor(
    private fb: FormBuilder,
    public loginStateService: LoginstateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private adminService: AdminService,
    private matDialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      newConfPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.changePasswordForm.controls;
  }

  async changePassword() {
    if (this.changePasswordForm.valid) {
      const loginState = this.loginStateService.getLoginState();
      const newPasswordModel: NewPasswordModel = new NewPasswordModel();
      newPasswordModel.userId = loginState.userId;
      newPasswordModel.oldPassword = this.form.currentPassword.value;
      newPasswordModel.newPassword = this.form.newPassword.value;

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        if (loginState.role === 'User') {
          resp = await this.userService.updatePassword(newPasswordModel);
        } else if (loginState.role === 'Admin') {
          resp = await this.adminService.updatePassword(newPasswordModel);
        }
        const msg = resp.body.message;
        if (msg) {
          snackbarMsg = msg + '! please login again.';
          this.loginStateService.destroySession(loginState.role);
          this.matDialogRef.close();
          this.router.navigate(['/login']);
        } else {
          snackbarMsg = NO_RESP;
          panelClass = 'red';
        }
      } catch (ex) {
        snackbarMsg = getErrorMessage(ex);
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

  closeDialogBox() {
    this.matDialogRef.close();
  }

}
