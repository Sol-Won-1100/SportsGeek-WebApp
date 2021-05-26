import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { UserFutureBets } from 'src/app/common/model/statistics/user-future-bets';
import { UsersWinningLosingModel } from 'src/app/common/model/statistics/users-winning-losing-points';
import { UserStats } from 'src/app/common/model/statistics/userstats';
import { UserModel } from 'src/app/common/model/user/user-model';
import { UserStaticticsService } from 'src/app/common/service/statistics/user-statictics.service';
import { UserService } from 'src/app/common/service/user_service/user.service';

@Component({
  selector: 'app-view-others-user-profile',
  templateUrl: './view-others-user-profile.component.html',
  styleUrls: ['./view-others-user-profile.component.css']
})
export class ViewOthersUserProfileComponent implements OnInit {

  profile = "../assets/img/profile.jpg";
  userData!: UserModel;
  userId!:number;
  userStats: UserStats[] = [];
  userFutureBets:UserFutureBets[] = [];

  usersWinningLoosingPoints!:UsersWinningLosingModel;
  // usersWinningLosingPoints!:UsersWinningModel;

  showForm:boolean = false;

  newform()
  {
    this.showForm =!this.showForm;
  }

  constructor(
    private route:ActivatedRoute,
    private userservice: UserService,
      private dialog: MatDialog,
      private snackbar: MatSnackBar,
      private userstats:UserStaticticsService
  ) { }

  async ngOnInit() {

    this.route.params.subscribe(data=>{
      this.userId=data.id;
    });

    this.userFutureBets = await this.getUsersFutureContest();
    console.log(this.userFutureBets);

    this.userStats = await this.getUserStats();
    console.log(this.userStats);

    this.userData = await this.getUsers();
    console.log(this.userData);

    // this.usersWinningLosingPoints = await this.getUserWinningPoints();
    // console.log(this.usersWinningLosingPoints);

    this.usersWinningLoosingPoints = await this.getUserWinningAndLosingPoints();
    console.log(this.usersWinningLoosingPoints);
  }

  findsum(data:any){    
    data.forEach((element:any) => {      
      let obj = this.userFutureBets.find(o => o.userId == element.userId);
      if(obj)
      element.totalWinningPoints += obj.contestPoints;
    });   
  }

  // GET USERS FUTURE BETS AND CURRENT POINTS

  // a= this.userStats.find(data => data.userId == this.userId)?.totalWinningPoints;

  // const index = this.userStats.findIndex(data => data.userId == this.userId);
  // this.userStats[index].totalWinningPoints;

  async getUserStats(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userModel: UserStats[] = [];
    let resp = null;
    try {
      resp = await this.userstats.getUserStatsById(this.userId);
      userModel = resp.body;
      this.findsum(userModel);
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

  // USERS FUTURE CONTEST

  async getUsersFutureContest(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userFutureBets: UserFutureBets[] = [];
    let resp = null;
    try {
      resp = await this.userstats.getUserFutureBetsById(this.userId);
      userFutureBets = resp.body;
      if (userFutureBets) {
        dialogRef.close();
        return userFutureBets;
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



  async getUsers(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userModel: UserModel[] = [];
    let resp = null;
    try {
      resp = await this.userservice.getUserById(this.userId);
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

  async getUserWinningAndLosingPoints(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let usersWinningLosingPoints: UsersWinningLosingModel[] = [];
    let resp = null;
    try {
      resp = await this.userstats.getUserWinningLosingPoint(this.userId);
      usersWinningLosingPoints = resp.body;
      if (usersWinningLosingPoints) {
        dialogRef.close();
        return usersWinningLosingPoints;
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
