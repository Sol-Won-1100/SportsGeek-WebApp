import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { MatchModel } from 'src/app/common/model/match/match-model';
import { UserModel } from 'src/app/common/model/user/user-model';
import { MatchesService } from 'src/app/common/service/matches_service/matches.service';
import { MatchCRUDComponent } from '../CRUD/match-crud/match-crud.component';
import { UpdateMatchResultComponent } from '../CRUD/update-match-result/update-match-result.component';

@Component({
  selector: 'app-admin-manage-matches',
  templateUrl: './admin-manage-matches.component.html',
  styleUrls: ['./admin-manage-matches.component.css']
})
export class AdminManageMatchesComponent implements OnInit {

  matchData: MatchModel[] = [];

  displayedColumns: string[] = ['matchId', 'minimumPoints','startDatetime', 'team1', 'team1Id', 'team1Logo', 'team1Short', 'team2', 'team2Id', 'team2Logo', 'team2Short','tournamentId','venue','resultStatus','winnerTeamId','delete'];

  dataSource: MatTableDataSource<MatchModel> = new MatTableDataSource();
  // dataSource = new MatTableDataSource<UserModel>(this.userData);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private matchservice: MatchesService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.matchData = await this.getMatches();
    console.log(this.matchData);

    this.dataSource.data = this.matchData;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getResultStatus(matchId: any) {
    return this.matchData.find(obj => obj.matchId === matchId)?.resultStatus;
  }

  async getMatches(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let userModel: UserModel[] = [];
    let resp = null;
    try {
      resp = await this.matchservice.getAllMatches();
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

  async deleteMatch(matchData:MatchModel): Promise<any>
  {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    let matchModel: MatchModel[] = [];
    let resp = null;
    try {
      resp = await this.matchservice.deleteMatch(matchData.matchId);
      matchModel = resp.body;
      if (matchModel) {
        return matchModel;
      } else {
        snackbarMsg = NO_RESP;
        panelClass = 'red';
        location.reload();
      }
    } catch (ex) {
      snackbarMsg = getErrorMessage(ex);
      panelClass = 'red';
    } finally {
    }
    if (snackbarMsg) {
      snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
        getSnackbarProperties(snackbarMsg, panelClass));
    }
    return [];
  }

  openMatchForm() {
    const dialogRef = this.dialog.open(MatchCRUDComponent,
      { panelClass: 'no-padding-dialog', disableClose: true });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.matchData.push(data);
        this.dataSource.data = this.matchData;
        location.reload();
      }
    });
  }
  updateMatchForm(data: any) {
    const dialogRef = this.dialog.open(MatchCRUDComponent,
      { panelClass: 'no-padding-dialog', disableClose: true, data });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.matchData.push(data);
        this.dataSource.data = this.matchData;
        location.reload();
      }
    });
  }

  openResultForm() {
    const dialogRef = this.dialog.open(UpdateMatchResultComponent,
      { panelClass: 'no-padding-dialog', disableClose: true });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        console.log("result updated");        
      }
    });
  }

}
