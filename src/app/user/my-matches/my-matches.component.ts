import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { LiveMatchModel } from 'src/app/common/model/match/liveMatchesModel';
import { MatchModel } from 'src/app/common/model/match/match-model';
import { OldMatchesModel } from 'src/app/common/model/match/oldMatchesModel';
import { UpcomingMatch } from 'src/app/common/model/match/upcomingMatches';
import { BotService } from 'src/app/common/service/bot/bot.service';
import { LoginstateService } from 'src/app/common/service/login_state/loginstate.service';
import { MatchesService } from 'src/app/common/service/matches_service/matches.service';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.css']
})
export class MyMatchesComponent implements OnInit {

  teamColor:any = {
    CSK: '#ff0', //csk
    DC: '#2561ae', //dc
    KKR: '#7300ab', //kkr
    MI: '#004f91', //mi
    PBKS: '#ed1f27', //pk
    RR: 'RGB(37 ,74 ,165)', //rr
    RCB: '#d5152c', //rcb
    SRH: '#f7a721', //srh
    //in case if the ids of the above teams changes, default colors will be used
    t1: 'pink', //
    t2: 'silver' //
  };

  teamFontColor:any = {
    CSK: 'black', //csk
    DC: '#fff', //dc
    KKR: '#fff', //kkr
    MI: '#fff', //mi
    PBKS: '#fff', //pk
    RR: 'white', //rr
    RCB: '#fff', //rcb
    SRH: 'black', //srh
    //in case if the ids of the above teams changes, default colors will be used
    t1: 'black', //
    t2: 'black' //
  }

  borderTop:any = {
    CSK: '5px solid #ef9b0f', //csk
    DC: '5px solid #4B9CD3', //dc
    KKR: '5px solid #430064', //kkr
    MI: '5px solid blue', //mi
    PBKS: '5px solid #4A0000', //pk
    RR: '5px solid #1877F2', //rr
    RCB: '5px solid #800000', //rcb
    SRH: '5px solid #F05E23', //srh
    //in case if the ids of the above teams changes, default colors will be used
    t1: 'pink', //
    t2: 'silver' //
  };

  upcoming = "../assets/img/upcoming.jpg";

  upcomingMatches!: UpcomingMatch[];

  liveMatch!: LiveMatchModel[];

  oldMatches!:OldMatchesModel[];

  constructor(
    private botservice: BotService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,    
    private matchservice:MatchesService,
    public loginStateService: LoginstateService,
  ) { }

  loginState = this.loginStateService.getLoginState();
  userId = this.loginState.userId;

  async ngOnInit() {

    this.upcomingMatches = await this.UpcomingMatches(this.userId);
    console.log(this.upcomingMatches);

    this.liveMatch = await this.LiveMatch(this.userId);
    console.log(this.liveMatch);

    this.oldMatches = await this.MatchResult(this.userId);
    console.log(this.oldMatches);
    
  }

  // UPCOMING MATCHES

  async UpcomingMatches(userId:number): Promise<any>
  {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let upcomingMatches: UpcomingMatch[] = [];
    let resp = null;
    try {
      resp = await this.matchservice.upcomingMatches(userId);
      upcomingMatches = resp.body;
      if (upcomingMatches) {
        dialogRef.close();
        return upcomingMatches;
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

  // LIVE MATCH

  async LiveMatch(userId:number): Promise<any>
  {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let liveMatch: LiveMatchModel[] = [];
    let resp = null;
    try {
      resp = await this.matchservice.liveMatch(userId);
      liveMatch = resp.body;
      if (liveMatch) {
        dialogRef.close();
        return liveMatch;
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

  // OLD MATCHES RESULTS

  async MatchResult(userId:number): Promise<any>
  {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let oldMatches: OldMatchesModel[] = [];
    let resp = null;
    try {
      resp = await this.matchservice.allMatchResult(userId);
      oldMatches = resp.body;
      if (oldMatches) {
        dialogRef.close();
        return oldMatches;
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
  //   return this.upcomingMatches && this.upcomingMatches.team1Id ? this.teamColor[this.upcomingMatches.team1Id] : this.teamColor.t1;
  // }

  // getColorForTeam2(){
  //   return this.upcomingMatches && this.upcomingMatches.team2Id ? this.teamColor[this.upcomingMatches.team2Id] : this.teamColor.t2;
  // }

}
