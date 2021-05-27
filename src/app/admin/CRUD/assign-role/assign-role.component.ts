import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { RoleModel } from 'src/app/common/model/role/role';
import { UserModel } from 'src/app/common/model/user/user-model';
import { UserService } from 'src/app/common/service/user_service/user.service';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {

  assignRole!:FormGroup;
  userData: UserModel[] = [];
  roleData!:RoleModel;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private matDialogRef: MatDialogRef<AssignRoleComponent>
  ) 
  {
    this.assignRole = this.fb.group({

      userId: ['', [Validators.required]],

      roleId: ['',[Validators.required]],
      
    });
   }

   reload()
  {
    location.reload();
  }

  get form() {
    return this.assignRole.controls;
  }

  roles:any[]=[{roleId:1,name:"Admin"},{roleId:2,name:"User"}];

  async ngOnInit(){
    this.userData = await this.getUsers();
    console.log(this.userData);
  }

  async getUsers(): Promise<any> {
    
    let userModel: UserModel[] = [];
    let resp = null;
      resp = await this.userservice.getAllUser();
      userModel = resp.body;
      if (userModel) {
        return userModel;
      }
    return [];
  }

  async updateRole() {
    console.log(this.form.validators);
    
    if (this.assignRole.valid) {
      console.log(this.form.validators);
      if (!this.roleData) {

        this.roleData = new RoleModel();
        this.roleData.userId = this.form.userId.value;       
        this.roleData.roleId = this.form.roleId.value;       

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          // resp = await this.matchservice.addMatches(this.roleData);
          resp = await this.userservice.updateRole(this.roleData.userId,this.roleData.roleId);
          const msg = resp.message;
          if (msg != null && this.roleData.userId > 0)
          // && this.roleData.matchId > 0
          {
            snackbarMsg = msg;
            this.matDialogRef.close(this.roleData);
            this.reload();
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } catch (ex) {
          snackbarMsg = getErrorMessage(ex);
          panelClass = 'green';
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
