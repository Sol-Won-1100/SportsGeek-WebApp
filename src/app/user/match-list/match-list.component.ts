import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { MatchModel } from 'src/app/common/model/match/match-model';
import { MatchesService } from 'src/app/common/service/matches_service/matches.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  teamColor:any = {
    1: '#ff0', //csk
    2: '#2561ae', //dc
    3: '#7300ab', //kkr
    4: '#004f91', //mi
    5: '#ed1f27', //pk
    6: 'RGB(37 ,74 ,165)', //rr
    7: '#d5152c', //rcb
    8: '#f7a721', //srh
    //in case if the ids of the above teams changes, default colors will be used
    t1: 'pink', //
    t2: 'silver' //
  };

  teamFontColor:any = {
    1: 'black', //csk
    2: '#fff', //dc
    3: '#fff', //kkr
    4: '#fff', //mi
    5: '#fff', //pk
    6: 'white', //rr
    7: '#fff', //rcb
    8: 'black', //srh
    //in case if the ids of the above teams changes, default colors will be used
    t1: 'black', //
    t2: 'black' //
  }

  borderTop:any = {
    1: '5px solid #ef9b0f', //csk
    2: '5px solid #4B9CD3', //dc
    3: '5px solid #430064', //kkr
    4: '5px solid blue', //mi
    5: '5px solid #af002a', //pk
    6: '5px solid #1877F2', //rr
    7: '5px solid #800000', //rcb
    8: '5px solid #F05E23', //srh
    //in case if the ids of the above teams changes, default colors will be used
    t1: 'pink', //
    t2: 'silver' //
  };

  stadium = "../assets/img/stadium.jpg";
  matchData!: MatchModel[];
  clearButton = false;
  searchTitle = 'Place Bet on the upcoming Matches!';

  constructor(
    private matchservice: MatchesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.matchData = await this.getMatchDetails();
    console.log(this.matchData); 
  }

  async getMatchDetails(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let matchModel: MatchModel[] = [];
    let resp = null;
    try {
      resp = await this.matchservice.getAllUpcomingMatches();
      matchModel = resp.body;
      if (matchModel) {
        dialogRef.close();
        return matchModel;
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

  // getColorForTeam1(){
  //   return this.matchData && this.matchData.team1Id ? this.teamColor[this.matchData.team1Id] : this.teamColor.t1;
  // }

  // getColorForTeam2(){
  //   return this.matchData && this.matchData.team2Id ? this.teamColor[this.matchData.team2Id] : this.teamColor.t2;
  // }

}
