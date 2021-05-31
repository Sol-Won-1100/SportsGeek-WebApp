import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { getErrorMessage, NO_RESP } from '../../constants/error-message';
import { getSnackbarProperties } from '../../constants/snackbar-properties';
import { ChangeForgotPassword } from '../../model/change-password/change-forgot-password';
import { SendOtpForForgotPassword } from '../../model/change-password/sendotp';
import { ResetPasswordWithOtpService } from '../../service/fotgot-password/reset-password-with-otp.service';
import { LoadingComponent } from '../loading/loading.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  generateOtp: FormGroup;
  otpWithNewPassword: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private resetPassword: ResetPasswordWithOtpService,
    private router: Router
    // private matDialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {
    this.generateOtp = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      mobilenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });

    this.otpWithNewPassword = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      newConfPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }

  ngOnInit() {
  }

  get otpform() {
    return this.generateOtp.controls;
  }

  get otpWithNewPasswordForm() {
    return this.otpWithNewPassword.controls;
  }

  async sendOtp() {
    if (this.generateOtp.valid) {
      const sendOtpModel: SendOtpForForgotPassword = new SendOtpForForgotPassword();
      sendOtpModel.email = this.otpform.email.value;
      sendOtpModel.mobileNumber = this.otpform.mobilenumber.value;

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.resetPassword.sendOtp(sendOtpModel);
        const msg = resp.body;
        if (msg) {
          localStorage.setItem('userId', resp.body.userId);
          snackbarMsg = 'Please check your Email for OTP.';
          // this.matDialogRef.close();
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

  getUserId() {
    let userId = localStorage.getItem('userId');
    return userId;
  }

  async newPasswordWithOtp() {
    if (this.otpWithNewPassword.valid) {
      const otpWithNewPassword: ChangeForgotPassword = new ChangeForgotPassword();
      otpWithNewPassword.otp = this.otpWithNewPasswordForm.otp.value;
      otpWithNewPassword.userId = this.getUserId();
      otpWithNewPassword.password = this.otpWithNewPasswordForm.newPassword.value;

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.resetPassword.updateForgotPassword(otpWithNewPassword);
        const msg = resp.body;
        if (msg) {
          snackbarMsg = 'Password Changed Sucessfully! Please Login to Continue.';
          // snackbarMsg = 'Password Changed! Please Login to Continue.';
          localStorage.removeItem('userId');
          this.router.navigate(['/login']);
          // this.matDialogRef.close();
        } else {
          snackbarMsg = NO_RESP;
          panelClass = 'red';
        }
      } catch (ex) {
        // this.router.navigate(['/login']);
        // localStorage.removeItem('userId');
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

}
