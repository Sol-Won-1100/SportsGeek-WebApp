import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxComponent } from 'src/app/common/components/confirm-box/confirm-box.component';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { UserModel } from 'src/app/common/model/user/user-model';
import { UserService } from 'src/app/common/service/user_service/user.service';
import { AssignRoleComponent } from '../CRUD/assign-role/assign-role.component';
import { UserInsertComponent } from '../CRUD/user-insert/user-insert.component';



@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrls: ['./admin-manage-user.component.css']
})
export class AdminManageUserComponent implements OnInit {

  userData: UserModel[] = [];

  displayedColumns: string[] = ['userId', 'firstName', 'genderName', 'roleName', 'username', 'availablePoints', 'email', 'mobileNumber', 'status', 'delete'];

  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource();
  // dataSource = new MatTableDataSource<UserModel>(this.userData);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private userservice: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.userData = await this.getUsers();
    console.log(this.userData);

    this.dataSource.data = this.userData;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getActiveStatus(userId: any) {
    return this.userData.find(obj => obj.userId === userId)?.status;
  }

  async changeActiveStatus(userId: number, isActive: boolean) {

    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let msg;
    let resp = null;
    try {
      resp = await this.userservice.updateActiveStatus(userId, isActive);
      msg = resp.message;
      if (msg) {
        dialogRef.close();
        const i = this.userData.findIndex(obj => obj.userId === userId);
        this.userData[i].status = isActive;
        snackbarMsg = msg;
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

  async getUsers(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userModel: UserModel[] = [];
    let resp = null;
    try {
      resp = await this.userservice.getAllUser();
      userModel = resp.body;
      if (userModel) {
        dialogRef.close();
        return userModel;
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
    return [];
  }

  async deleteUser(userData: UserModel): Promise<any> {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef1 = this.dialog.open(ConfirmBoxComponent, {
        panelClass: 'no-padding-dialog',
        data: 'Think Twice Before Deleting'
      });
      const closeResp = await dialogRef1.afterClosed().toPromise();
      if (closeResp) {
        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        // let userModel: UserModel[] = [];
        let msg;
        let resp = null;
        try {
          resp = await this.userservice.deleteUser(userData.userId);
          msg = resp.body.message;
          if (msg) {
            snackbarMsg = msg;
            dialogRef.close();
            location.reload();
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
        return [];
      }
    }
  }


  openUserForm() {
    const dialogRef = this.dialog.open(UserInsertComponent,
      { panelClass: 'no-padding-dialog', disableClose: true });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.userData.push(data);
        this.dataSource.data = this.userData;
      }
    });
  }
  updateUserForm(data: any) {
    const dialogRef = this.dialog.open(UserInsertComponent,
      { panelClass: 'no-padding-dialog', disableClose: true, data });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.userData.push(data);
        this.dataSource.data = this.userData;
      }
    });
  }

  openAssignForm() {
    const dialogRef = this.dialog.open(AssignRoleComponent,
      { panelClass: 'no-padding-dialog', disableClose: true });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.userData.push(data);
        this.dataSource.data = this.userData;
      }
    });
  }
}
