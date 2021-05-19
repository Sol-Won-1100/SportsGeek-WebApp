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

}
