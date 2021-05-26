import { Inject } from '@angular/core';
import { Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { BotModel } from 'src/app/common/model/bot/BotModel';
import { CheckContestByUserAndMatchId } from 'src/app/common/model/bot/contestbyuserandmatchid';
import { MatchModel } from 'src/app/common/model/match/match-model';
import { BotService } from 'src/app/common/service/bot/bot.service';
import { LoginstateService } from 'src/app/common/service/login_state/loginstate.service';
import { MatchesService } from 'src/app/common/service/matches_service/matches.service';

@Component({
  selector: 'app-insert-update-contest',
  templateUrl: './insert-update-contest.component.html',
  styleUrls: ['./insert-update-contest.component.css']
})
export class InsertUpdateContestComponent implements OnInit {

  userForm!: FormGroup;
  botData!:BotModel;
  botForm!: FormGroup;
  checkk!:CheckContestByUserAndMatchId;
  matchData!: MatchModel;

  constructor(
    private fb: FormBuilder,
    private loginStateService:LoginstateService,
    private botservice: BotService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private matchservice:MatchesService,
    private matDialogRef: MatDialogRef<InsertUpdateContestComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: BotModel
  ) {
    this.botData = data;
    if (data) {
      this.botForm = this.fb.group({
        // contestId: [{ value: this.botData.contestId, disabled: true }],

        // userId: [{value: localStorage.getItem('userId'),disabled:true}],

        matchId: [{value: this.data.matchId, disabled:true}],

        contestPoints: [this.data.contestPoints, [ Validators.minLength(2), Validators.maxLength(4), Validators.pattern('[0-9]+')]],

        selectTeam: [this.data.teamId, [Validators.required]]

      });
    } else {
      this.botForm = this.fb.group({

        // contestId: [{  disabled: true }],

        // userId: [{value: localStorage.getItem('userId'),disabled:true}],

        matchId: [{value: this.data.matchId, disabled:true}],

        contestPoints: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4), Validators.pattern('[0-9]+')]],

        selectTeam: ['', [Validators.required]]

      });
    }
  }

  async ngOnInit(){
    this.matchData = await this.getMatchById(this.data.matchId);
    console.log(this.matchData);

    this.checkk = await this.getPlayersBetByUserAndMatchId(this.loginState.userId,this.data.matchId);
    console.log(this.checkk);
  }

  async getMatchById(matchId:number): Promise<any>
  {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let matchModel: MatchModel[] = [];
    let resp = null;
    try {
      resp = await this.matchservice.viewMatchById(matchId);
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

  // CHECK IF PLAYER HAS PLACED BET

  async getPlayersBetByUserAndMatchId(userId:number,matchId:number): Promise<any>
  {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let botModel: BotModel[] = [];
    let resp = null;
    try {
      resp = await this.botservice.viewAllContestByUserAndMatchId(userId,matchId);
      botModel = resp.body;
      if (botModel) {
        dialogRef.close();
        return botModel;
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
    // if (snackbarMsg) {
    //   snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
    //     getSnackbarProperties(snackbarMsg, panelClass));
    // }
    return [];
  }

  reload() {
    location.reload();
  }

  get form() {
    return this.botForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }
 
  loginState = this.loginStateService.getLoginState();


  async PlaceBet() {
    if (this.botForm.valid) {
      if (!this.botData.contestId) {
        this.botData = new BotModel();
        this.botData.contestId = 0;
        this.botData.userId = this.loginState.userId;
        this.botData.matchId = this.data.matchId;
        this.botData.contestPoints = this.form.contestPoints.value;
        this.botData.teamId = this.form.selectTeam.value;
        // this.botData.winningPoints = 0;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.botservice.addBet(this.botData);
          this.botData = resp;
          if (this.botData != null )
          // && this.botData.contestId > 0
          {
            snackbarMsg = 'Bet successfully Placed!';
            this.matDialogRef.close();
            this.reload();
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } catch (ex) {
          snackbarMsg = getErrorMessage(ex);
          panelClass = 'red';
        } finally {
          dialogRef.close();
          if (snackbarMsg) {
            snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
              getSnackbarProperties(snackbarMsg, panelClass));
          }
        }
      } else {

        this.botData = new BotModel();
        this.botData.contestId = this.botData.contestId;
        this.botData.userId = this.loginState.userId;
        this.botData.matchId = this.data.matchId;
        this.botData.teamId = this.form.selectTeam.value;
        this.botData.contestPoints = this.form.contestPoints.value;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.botservice.updateBet(this.data.contestId, this.botData);
          this.botData = resp;
          if (this.botData != null) {
            snackbarMsg = 'Bet successfully updated!';
            this.matDialogRef.close();
            this.reload();
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } catch (ex) {
          snackbarMsg = getErrorMessage(ex);
          panelClass = 'red';
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
