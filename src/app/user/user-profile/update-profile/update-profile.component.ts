import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { UserModel } from 'src/app/common/model/user/user-model';
import { LoginstateService } from 'src/app/common/service/login_state/loginstate.service';
import { UserService } from 'src/app/common/service/user_service/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  userForm: FormGroup;
  userModel: UserModel;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public loginStateService: LoginstateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router:Router,
    private matDialogRef: MatDialogRef<UpdateProfileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {
    this.userModel = data;
    console.log(this.userModel);
    
    this.userForm = this.fb.group({

      // userId: [{ value: this.userModel.userId, disabled: true }],

      username: [this.data.username, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      // , Validators.pattern('[a-zA-Z ]+')

      genderId: [this.data.genderId],
      // , [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[1-2]+')]

      firstname: [this.data.firstName, [Validators.required, Validators.minLength(4)
        , Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],

      lastname: [this.data.lastName, [Validators.required, Validators.minLength(4)
          , Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],

      mobilenumber: [this.data.mobileNumber, [Validators.required, Validators.minLength(10)
        , Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],

      email: [this.data.email, [Validators.email]],

      profilePicture: [this.data.profilePicture]
      // , [Validators.required, Validators.minLength(4), Validators.maxLength(500)]
     
    });
  }

  gender:any[]=[{genderId:1,name:"Male"},{genderId:2,name:"Female"}];
  ngOnInit() {}

  get form() {
    return this.userForm.controls;
  }

  async updateUser() {
    if (this.userForm.valid) {
      // this.userModel.firstName = this.form.firstname.value;
      // this.userModel.lastName = this.form.lastname.value;
      // this.userModel.mobileNumber = this.form.mobilenumber.value;
      // this.userModel.email = this.form.email.value;
      const loginState = this.loginStateService.getLoginState();
      var formData: any = new FormData();
        formData.append("username", this.form.username.value);
        formData.append("firstName", this.form.firstname.value);
        formData.append("lastName", this.form.lastname.value);
        formData.append("email", this.form.email.value);
        formData.append("mobileNumber", this.form.mobilenumber.value);
        formData.append("genderId", this.form.genderId.value);
        if (this.form.profilePicture.value) {
          formData.append("profilePicture", this.form.profilePicture.value);
        }else{
          formData.append("profilePicture", 0);
        }
        

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.userService.updateUser(this.userModel.userId,formData);
        this.userModel = resp.body;
        if (this.userModel != null) {
          snackbarMsg = 'Profile successfully updated! Please Login Again';
          this.matDialogRef.close();
          this.loginStateService.destroySession(loginState.role);
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
        if (snackbarMsg) {
          snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
            getSnackbarProperties(snackbarMsg, panelClass));
        }
      }
    }
  }

  closeDialogBox() {
    this.matDialogRef.close();
  }

}
