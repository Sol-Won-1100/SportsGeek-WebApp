import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { UserModel } from 'src/app/common/model/user/user-model';
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
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<UpdateProfileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {
    this.userModel = data;
    console.log(this.userModel);
    
    this.userForm = this.fb.group({

      userId: [{ value: this.userModel.userId, disabled: true }],

      username: [{ value: this.userModel.username, disabled: true }],

      firstname: [this.userModel.firstName, [Validators.required, Validators.minLength(4)
        , Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],

      lastname: [this.userModel.lastName, [Validators.required, Validators.minLength(4)
          , Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+')]],

      mobilenumber: [this.userModel.mobileNumber, [Validators.required, Validators.minLength(10)
        , Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],

      email: [this.userModel.email, [Validators.required, Validators.email, Validators.maxLength(200)]],
     
    });
  }

  ngOnInit() {
    
  }

  get form() {
    return this.userForm.controls;
  }

  async updateUser() {
    if (this.userForm.valid) {
      this.userModel.firstName = this.form.firstname.value;
      this.userModel.lastName = this.form.lastname.value;
      this.userModel.mobileNumber = this.form.mobilenumber.value;
      this.userModel.email = this.form.email.value;

      let panelClass = 'green';
      let snackbarMsg = '';
      let snackbarRef = null;
      this.snackbar.dismiss();
      const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      let resp = null;
      try {
        resp = await this.userService.updateUser(this.userModel.userId,this.userModel);
        this.userModel = resp.body;
        if (this.userModel != null) {
          snackbarMsg = 'Profile successfully updated!';
          this.matDialogRef.close();
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
