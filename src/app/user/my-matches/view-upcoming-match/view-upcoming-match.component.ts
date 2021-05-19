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
  selector: 'app-view-upcoming-match',
  templateUrl: './view-upcoming-match.component.html',
  styleUrls: ['./view-upcoming-match.component.css']
})
export class ViewUpcomingMatchComponent implements OnInit {

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
  
}
