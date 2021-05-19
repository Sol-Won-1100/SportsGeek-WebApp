import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { RU } from 'src/app/common/constants/roles';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { LoginStateModel } from 'src/app/common/model/login/LoginStateModel';
import { UserWithPasswordModel } from 'src/app/common/model/user/user-with-password-model';
import { LoginstateService } from 'src/app/common/service/login_state/loginstate.service';
import { UserService } from 'src/app/common/service/user_service/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  image = "../assets/register.jpg";
  signupForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    // private loginStateService: LoginstateService,
    private router: Router,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]+')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@%!])[0-9a-zA-Z@%!]{8,}$/)]],
      confPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],
      firstname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9._%+-]+@bbd.co.za$/)]],
      gender : ['',Validators.required]
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.signupForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  async signup() {
    if (this.signupForm.valid) {
      let userWithPasswordModel: UserWithPasswordModel = new UserWithPasswordModel();
      userWithPasswordModel.userId = 0;
      userWithPasswordModel.username = this.form.username.value;
      userWithPasswordModel.password = this.form.password.value;
      userWithPasswordModel.firstName = this.form.firstname.value;
      userWithPasswordModel.lastName = this.form.lastname.value;
      userWithPasswordModel.email = this.form.email.value;
      userWithPasswordModel.mobileNumber = this.form.phone.value;
      userWithPasswordModel.genderId = this.form.gender.value;
      userWithPasswordModel.status = false;
      userWithPasswordModel.roleId = 2;
      userWithPasswordModel.availablePoints = 500;
      

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.userService.signup(userWithPasswordModel);
        userWithPasswordModel = resp.body;
        if (userWithPasswordModel != null && userWithPasswordModel.userId > 0) {
          snackbarMsg = 'Your data has been Submitted, Please wait for the Admin to Approve!';
          this.router.navigate(['/User/login']);
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
}