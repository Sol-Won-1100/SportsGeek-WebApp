import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ConfirmBoxComponent } from 'src/app/common/components/confirm-box/confirm-box.component';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { BotModel } from 'src/app/common/model/bot/BotModel';
import { CheckContestByUserAndMatchId } from 'src/app/common/model/bot/contestbyuserandmatchid';
import { MatchModel } from 'src/app/common/model/match/match-model';
import { UserModel } from 'src/app/common/model/user/user-model';
import { BotService } from 'src/app/common/service/bot/bot.service';
import { LoginstateService } from 'src/app/common/service/login_state/loginstate.service';
import { MatchesService } from 'src/app/common/service/matches_service/matches.service';
import { UserService } from 'src/app/common/service/user_service/user.service';

@Component({
  selector: 'app-betting-page',
  templateUrl: './betting-page.component.html',
  styleUrls: ['./betting-page.component.css']
})
export class BettingPageComponent implements OnInit {

  fetchBotDetails: BotModel[] = [];
  calc!:MatchModel;
  botData!:BotModel;
  userData!: UserModel;
  checkk!:CheckContestByUserAndMatchId;

  displayedColumns: string[] = [ 'username', 'teamshortname', 'contestPoints'];

  dataSource: MatTableDataSource<BotModel> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  placebets = "../assets/img/placebets.jpg";
  matchId!:number;
  matchData!: MatchModel;
  botForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private botservice: BotService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,    
    private matchservice:MatchesService,
    private userservice: UserService,
    private loginStateService:LoginstateService
  ){}

  async ngOnInit(){
     this.route.params.subscribe(data=>{
       this.matchId=data.id;
     })    

     if (this.botData) {
      this.botForm = this.fb.group({
        // contestId: [{ value: this.botData.contestId, disabled: true }],

        // userId: [{value: localStorage.getItem('userId'),disabled:true}],

        matchId: [{value: this.matchId, disabled:true}],

        contestPoints: [this.botData.contestPoints, [Validators.required, Validators.minLength(2), Validators.maxLength(4), Validators.pattern('[0-9]+')]],

        selectTeam: [this.botData.teamId, [Validators.required]]

      });
    } else {
      this.botForm = this.fb.group({

        // contestId: [{  disabled: true }],

        // userId: [{value: localStorage.getItem('userId'),disabled:true}],

        matchId: [{value: this.matchId, disabled:true}],

        contestPoints: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4), Validators.pattern('[0-9]+')]],

        selectTeam: ['', [Validators.required]]

      });
    }
    this.calc = await this.getAllPlayerBetsByMatchIdForCalculation(this.matchId);

     this.fetchBotDetails = await this.getAllPlayerBetsByMatchId(this.matchId);
    console.log(this.fetchBotDetails);

    this.dataSource.data = this.fetchBotDetails;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   
    this.matchData = await this.getMatchById(this.matchId);
    console.log(this.matchData);

    this.checkk = await this.getPlayersBetByUserAndMatchId(this.loginState.userId,this.matchId);
    console.log(this.checkk);

    this.userData = await this.getUsersById();
    console.log(this.userData);

  }

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

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  // GET ALL PLAYER BETS ON TEAM

  async getAllPlayerBetsByMatchId(matchId:number): Promise<any>
  {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let botModel: BotModel[] = [];
    let resp = null;
    try {
      resp = await this.botservice.viewAllContestByMatchId(matchId);
      botModel = resp.body;
      this.findsum(botModel);
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
    if (snackbarMsg) {
      snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
        getSnackbarProperties(snackbarMsg, panelClass));
    }
    return [];
  }

  //  ADD BETS AND UPDATE BETS

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
    if(this.dialog.openDialogs.length==0){
    const dialogRef1 = this.dialog.open(ConfirmBoxComponent,{
      panelClass:'no-padding-dialog',
      data:'Nobody has ever Bet Enough on Winning Horse'
    });
    const closeResp = await dialogRef1.afterClosed().toPromise();
    if(closeResp){
    if (this.botForm.valid) {
      if (!this.botData) {
        this.botData = new BotModel();
        this.botData.contestId = 0;
        this.botData.userId = this.loginState.userId;
        this.botData.matchId = this.matchId;
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
  }
}

async updateBets(){
  if(this.dialog.openDialogs.length==0){
  const dialogRef2 = this.dialog.open(ConfirmBoxComponent,{
    panelClass:'no-padding-dialog',
    data:'Looks like you have intel on winning team'
  });
  const closeResp2 = await dialogRef2.afterClosed().toPromise();
  if(closeResp2){
  if (this.botForm.valid) {
    if (!this.botData) {
        this.botData = new BotModel();
        this.botData.contestId = this.checkk.contestId;
        this.botData.userId = this.loginState.userId;
        this.botData.matchId = this.matchId;
        this.botData.teamId = this.form.selectTeam.value;
        this.botData.contestPoints = this.form.contestPoints.value;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.botservice.updateBet(this.botData.contestId, this.botData);
          this.botData = resp.body;
          if (this.botData != null) {
            snackbarMsg = 'Bet successfully updated!';
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
  }
  }

  // THIS IS FOR CALCULATION PURPOSE ONLY
  
  team1points=0;
  team2points=0;

  findsum(data:any){    
    data.forEach((element:any) => {      
      if (element.teamShortName == this.calc.team1Short) {
        this.team1points+=element.contestPoints;
      }else if(element.teamShortName == this.calc.team2Short)
        this.team2points+=element.contestPoints;
    });   
    
  }  

    async getAllPlayerBetsByMatchIdForCalculation(matchId:number): Promise<any>
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

}
