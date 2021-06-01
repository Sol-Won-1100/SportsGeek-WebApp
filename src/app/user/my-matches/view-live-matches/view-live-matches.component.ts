import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { BotModel } from 'src/app/common/model/bot/BotModel';
import { MatchModel } from 'src/app/common/model/match/match-model';
import { BotService } from 'src/app/common/service/bot/bot.service';
import { MatchesService } from 'src/app/common/service/matches_service/matches.service';

@Component({
  selector: 'app-view-live-matches',
  templateUrl: './view-live-matches.component.html',
  styleUrls: ['./view-live-matches.component.css']
})
export class ViewLiveMatchesComponent implements OnInit {

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
    5: '5px solid #4A0000', //pk
    6: '5px solid #1877F2', //rr
    7: '5px solid #800000', //rcb
    8: '5px solid #F05E23', //srh
    //in case if the ids of the above teams changes, default colors will be used
    t1: 'pink', //
    t2: 'silver' //
  };


  fetchBotDetails: BotModel[] = [];
  calc!:MatchModel;
  displayedColumns: string[] = [ 'username', 'teamshortname', 'contestPoints'];

  dataSource: MatTableDataSource<BotModel> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  matchId!:number;
  matchData!: MatchModel;

  constructor(
    private route:ActivatedRoute,
    private botservice: BotService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,    
    private matchservice:MatchesService,
  ) { }

  async ngOnInit(){
    this.route.params.subscribe(data=>{
      this.matchId=data.id;
    });

    this.calc = await this.getAllPlayerBetsByMatchIdForCalculation(this.matchId);

    this.fetchBotDetails = await this.getAllPlayerBetsByMatchId(this.matchId);
    console.log(this.fetchBotDetails);

    this.dataSource.data = this.fetchBotDetails;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   
    this.matchData = await this.getMatchById(this.matchId);
    console.log(this.matchData);
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

    getColorForTeam1(){
      return this.matchData && this.matchData.team1Id ? this.teamColor[this.matchData.team1Id] : this.teamColor.t1;
    }
  
    getColorForTeam2(){
      return this.matchData && this.matchData.team2Id ? this.teamColor[this.matchData.team2Id] : this.teamColor.t2;
    }
  
    getFontColorForTeam1(){
      return this.matchData && this.matchData.team1Id ? this.teamFontColor[this.matchData.team1Id] : this.teamFontColor.t1;
    }
  
    getFontColorForTeam2(){
      return this.matchData && this.matchData.team2Id ? this.teamFontColor[this.matchData.team2Id] : this.teamFontColor.t2;
    }
  
    getBorderColorForTeam1(){
      return this.matchData && this.matchData.team1Id ? this.borderTop[this.matchData.team1Id] : this.borderTop.t1;
    }
  
    getBorderColorForTeam2(){
      return this.matchData && this.matchData.team2Id ? this.borderTop[this.matchData.team2Id] : this.borderTop.t2;
    }
}
