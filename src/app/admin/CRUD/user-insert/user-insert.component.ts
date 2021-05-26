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
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent implements OnInit {

  userForm!: FormGroup;
  userData!: UserModel;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private matDialogRef: MatDialogRef<UserInsertComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {
    this.userData = data;
    if (data) {
      this.userForm = this.fb.group({
        userId: [{ value: this.data.userId, disabled: true }],

        username: [ this.data.username,[Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('[a-zA-Z ]+')]],
        
        firstName: [this.data.firstName, [Validators.required, Validators.minLength(4)
          , Validators.maxLength(10), Validators.pattern('[a-zA-Z ]+')]],

        lastName: [this.data.lastName, [Validators.required, Validators.minLength(3)
            , Validators.maxLength(10), Validators.pattern('[a-zA-Z ]+')]],

        mobileNumber: [this.data.mobileNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],

        email: [this.data.email, [Validators.required, Validators.email,
        Validators.maxLength(100)]],

        genderId: [this.data.genderId, [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[1-2]+')]],

        roleId: [{value:this.data.roleId, disabled:true}],
        // [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[1-2]+')]

        availablePoints: [{value:this.data.availablePoints,disabled:true}],
        // [Validators.required, Validators.minLength(2), Validators.maxLength(4), Validators.pattern('[0-9]+')]

        profilePicture: [this.data.profilePicture, [Validators.required, Validators.minLength(4), Validators.maxLength(500)]]

      });
    } else {
      this.userForm = this.fb.group({

        userId: [{  disabled: true }],

        username: [ '', [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('[a-zA-Z ]+')]],

        firstName: ['', [Validators.required, Validators.minLength(4)
          , Validators.maxLength(10), Validators.pattern('[a-zA-Z ]+')]],

        lastName: ['', [Validators.required, Validators.minLength(3)
            , Validators.maxLength(10), Validators.pattern('[a-zA-Z ]+')]],

        mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9][0-9]{9}')]],

        email: ['', [Validators.required, Validators.email,
        Validators.maxLength(100)]],

        genderId: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[1-2]+')]],

        roleId: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[1-2]+')]],

        availablePoints: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4), Validators.pattern('[0-9]+')]],
        profilePicture: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]]

      });
    }
  }

  reload() {
    location.reload();
  }


  ngOnInit(): void { }

  get form() {
    return this.userForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }

  async addEmployee() {
    if (this.userForm.valid) {
      if (!this.userData) {
        this.userData = new UserModel();
        // this.userData.userId = 0;
        // this.userData.username = this.form.username.value;
        // this.userData.password = '12345';
        // this.userData.firstName = this.form.firstName.value;
        // this.userData.lastName = this.form.lastName.value;
        // this.userData.mobileNumber = this.form.mobileNumber.value;
        // this.userData.email = this.form.email.value;
        // this.userData.genderId = this.form.genderId.value;
        // this.userData.roleId = this.form.roleId.value;
        // this.userData.availablePoints = this.form.availablePoints.value;
        // this.userData.status = true;

        var formData: any = new FormData();
        formData.append("username", this.form.username.value);
        formData.append("password", 123456);
        formData.append("firstName", this.form.firstName.value);
        formData.append("lastName", this.form.lastName.value);
        formData.append("email", this.form.email.value);
        formData.append("mobileNumber", this.form.mobileNumber.value);
        formData.append("genderId", this.form.genderId.value);
        formData.append("roleId", 2);
        formData.append("availablePoints", this.form.availablePoints.value);
        formData.append("profilePicture", this.form.profilePicture.value);

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.userservice.signup(formData);
          this.userData = resp.body;
          if (this.userData != null && this.userData.userId > 0)
          {
            location.reload();
            snackbarMsg = 'User successfully added!';
            this.matDialogRef.close(this.userData);
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
      } else {

        // this.userData.username = this.form.username.value;

        // this.userData.firstName = this.form.firstName.value;
        // this.userData.lastName = this.form.lastName.value;
        // this.userData.mobileNumber = this.form.mobileNumber.value;
        // this.userData.email = this.form.email.value;
        // this.userData.genderId = this.form.genderId.value;

        // this.userData.roleId = this.form.roleId.value;
        // this.userData.availablePoints = this.form.availablePoints.value;

        var formData: any = new FormData();
        formData.append("username", this.form.username.value);
        formData.append("firstName", this.form.firstName.value);
        formData.append("lastName", this.form.lastName.value);
        formData.append("email", this.form.email.value);
        formData.append("mobileNumber", this.form.mobileNumber.value);
        formData.append("genderId", this.form.genderId.value);
        formData.append("profilePicture", this.form.profilePicture.value);


        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.userservice.updateUser(this.userData.userId, formData);
          this.userData = resp.body;
          if (this.userData != null) {
            snackbarMsg = 'User successfully updated!';
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
  }

  closeDialogBox() {
    this.matDialogRef.close();
  }
}
