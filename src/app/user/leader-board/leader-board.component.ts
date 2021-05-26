import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { UserFutureBets } from 'src/app/common/model/statistics/user-future-bets';
import { UserStats } from 'src/app/common/model/statistics/userstats';
import { UserStaticticsService } from 'src/app/common/service/statistics/user-statictics.service';
import { UserService } from 'src/app/common/service/user_service/user.service';

export interface rank1{ rank:number; }
@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  userStats: UserStats[] = [];
  userFutureBets:UserFutureBets[] = [];
  displayedColumns: string[] = ['rank','profilePicture','firstName','availablePoints'];

  dataSource: MatTableDataSource<UserStats> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private userservice: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private userstats: UserStaticticsService
  ) { }

  async ngOnInit() {
    this.userFutureBets = await this.getUsersFutureContest();
    console.log(this.userFutureBets);

    this.userStats = await this.getUsers();
    console.log(this.userStats);
    
    this.dataSource.data = this.userStats;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.sort1();
  }

  findsum(data:any){    
    data.forEach((element:any) => {      
      let obj = this.userFutureBets.find(o => o.userId == element.userId);
      if(obj)
      element.totalWinningPoints += obj.contestPoints;
    });   
    data.sort((obj1:any,obj2:any) =>{
      if (obj1.totalWinningPoints < obj2.totalWinningPoints){
        return 1;
      }
      else if(obj1.totalWinningPoints > obj2.totalWinningPoints){
        return -1;
      }
      return 0;
    
    });
  }

  sort1(){
    this.userStats = this.userStats.sort(
      (low:UserStats, high:UserStats) => +high.totalWinningPoints - +low.totalWinningPoints
    );
  }

  sortData(sort: Sort) {
    const data = this.userStats.slice();
    if (!sort.active || sort.direction === '') {
      this.userStats = data;
      return;
    }
    this.userStats = data.sort((a, b) => {
      const isDesc = sort.direction === 'desc';
      switch (sort.active) {
        case 'name': return this.compare(a.totalWinningPoints, b.totalWinningPoints, isDesc);
        default: return 0;
      }
    });
  }

  compare(a:number , b:number, isDesc:boolean){
    return (a<b ? -1 : 1) * (isDesc ? 1 : -1)
  }

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // GET USER DETAILS

  async getUsers(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userModel: UserStats[] = [];
    let resp = null;
    try {
      resp = await this.userstats.getUserStats();
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
      resp = await this.userstats.getUserFutureBets();
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

}
