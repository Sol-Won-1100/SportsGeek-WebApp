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
import { TeamModel } from 'src/app/common/model/team/team-model';
import { TeamService } from 'src/app/common/service/team_service/team.service';
import { TeamComponent } from '../CRUD/team/team.component';

@Component({
  selector: 'app-admin-manage-team',
  templateUrl: './admin-manage-team.component.html',
  styleUrls: ['./admin-manage-team.component.css']
})
export class AdminManageTeamComponent implements OnInit {

  teamData: TeamModel[] = [];

  displayedColumns: string[] = ['teamId', 'name', 'shortName', 'teamLogo', 'delete'];

  dataSource: MatTableDataSource<TeamModel> = new MatTableDataSource();
  // dataSource = new MatTableDataSource<RechargeModel>(this.teamData);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private teamservice: TeamService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.teamData = await this.getTeams();
    console.log(this.teamData);

    this.dataSource.data = this.teamData;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteTeam(teamData: TeamModel): Promise<any> {
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
        // let recharegeModel: RechargeModel[] = [];
        let msg;
        let resp = null;
        try {
          resp = await this.teamservice.deleteTeam(teamData.teamId);
          msg = resp.body.message;
          if (msg) {
            dialogRef.close();
            snackbarMsg = msg;
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

  async getTeams(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let teamModel: TeamModel[] = [];
    let resp = null;
    try {
      resp = await this.teamservice.getAllTeams();
      teamModel = resp.body;
      if (teamModel) {
        dialogRef.close();
        return teamModel;
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


  openTeamForm() {
    const dialogRef = this.dialog.open(TeamComponent,
      { panelClass: 'no-padding-dialog', disableClose: true });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.teamData.push(data);
        this.dataSource.data = this.teamData;
      }
    });
  }
  updateTeamForm(data: any) {
    const dialogRef = this.dialog.open(TeamComponent,
      { panelClass: 'no-padding-dialog', disableClose: true, data });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.teamData.push(data);
        this.dataSource.data = this.teamData;
      }
    });
  }

}
