import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from 'src/app/common/components/change-password/change-password.component';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { UsersLoosingModel } from 'src/app/common/model/statistics/users-loosing-points';
import { UsersWinningModel } from 'src/app/common/model/statistics/users-winning-points';
import { UserModel } from 'src/app/common/model/user/user-model';
import { LoginstateService } from 'src/app/common/service/login_state/loginstate.service';
import { UserStaticticsService } from 'src/app/common/service/statistics/user-statictics.service';
import { UserService } from 'src/app/common/service/user_service/user.service';
import { UpdateProfileComponent } from '../user-profile/update-profile/update-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData!: UserModel;

  usersLoosingPoints!:UsersLoosingModel;
  usersWinningPoints!:UsersWinningModel;
  showForm:boolean = false;

  newform()
  {
    this.showForm =!this.showForm;
  }

  constructor(
    private userservice: UserService,
      private dialog: MatDialog,
      private snackbar: MatSnackBar,
      private userstats:UserStaticticsService,
      private loginStateService:LoginstateService
  ) { }

  async ngOnInit() {
    this.userData = await this.getUsersById();
    console.log(this.userData);

    this.usersWinningPoints = await this.getUserWinningPoints();
    console.log(this.usersWinningPoints);

    this.usersLoosingPoints = await this.getUserLoosingPoints();
    console.log(this.usersLoosingPoints);
  }

  loginState = this.loginStateService.getLoginState();

  async getUsersById(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userModel: UserModel[] = [];
    let resp = null;
    try {
      resp = await this.userservice.getUserById(this.loginState.userId);
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

  // GET USER STATISTICS

  async getUserWinningPoints(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let usersWinningPoints: UsersWinningModel[] = [];
    let resp = null;
    try {
      resp = await this.userstats.getUserWinningPoint(this.loginState.userId);
      usersWinningPoints = resp.body;
      if (usersWinningPoints) {
        dialogRef.close();
        return usersWinningPoints;
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

  async getUserLoosingPoints(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let usersLoosingPoints: UsersLoosingModel[] = [];
    let resp = null;
    try {
      resp = await this.userstats.getUserLossingPoint(this.loginState.userId);
      usersLoosingPoints = resp.body;
      if (usersLoosingPoints) {
        dialogRef.close();
        return usersLoosingPoints;
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

  openUpdateUserProfileForm(data: UserModel) {
    const dialogRef = this.dialog.open(UpdateProfileComponent,
      { panelClass: 'no-padding-dialog', disableClose: true, data });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        location.reload();
      }
    });
  }

  openUpdateUserPasswordForm() {
    const dialogRef = this.dialog.open(ChangePasswordComponent,
      { panelClass: 'no-padding-dialog', disableClose: true });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        location.reload();
      }
    });
  }
}
