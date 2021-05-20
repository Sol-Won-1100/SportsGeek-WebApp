import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { matchBaseURL, usersBaseURL } from '../../constants/http-urls';
import { MatchModel } from '../../model/match/match-model';

// let matchBaseURL = 'http://localhost:8081/matches';
// let usersBaseURL = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http:HttpClient) { }

  async getAllMatches(): Promise<any>
  {
    return await this.http.get<MatchModel>(matchBaseURL , { observe:'response' }).toPromise();
  }

  async addMatches(matchModel:MatchModel):Promise<any>
  // async addMatches(formData:FormData):Promise<any>
  {
    return await this.http.post<MatchModel>(matchBaseURL , matchModel,{observe:'response'}).toPromise();
  }

  async updateMatches(matchId:number, model:MatchModel):Promise<any>
  // async updateMatches(matchId:number, formData:MatchModel):Promise<any>
  {
    return await this.http.put<MatchModel>(matchBaseURL + '/' + matchId,model, {observe:'response'}).toPromise();
  }

  async updateMatchResult(matchId:number,resultStatus:number,winnerTeamId:number):Promise<any>
  {
    return await this.http.put<MatchModel>(matchBaseURL + '/update-match/' + matchId + '/' +resultStatus + '/' +winnerTeamId, {observe:'response'}).toPromise();
  }

  async deleteMatch(matchId: number): Promise<any> {
    return await this.http.delete<MatchModel>(matchBaseURL + '/' + matchId).toPromise();
  }

  async updateMatchWinner(matchId: number, resultStatus: boolean, winnerTeamId:number): Promise<any> {
    return await this.http.put<any>(matchBaseURL + '/update-match/' + matchId + '/' + resultStatus + '/' + winnerTeamId, { observe: 'response' }).toPromise();
  }

  async viewMatchById(matchId:number):Promise<any>
  {
    return await this.http.get<MatchModel>(matchBaseURL + '/' + matchId, {observe: 'response'}).toPromise();
  }

  async upcomingMatches(userId:number):Promise<any>
  {
    return await this.http.get<MatchModel>(usersBaseURL + '/'  + userId + '/upcoming' , {observe: 'response'}).toPromise();
  }

  async liveMatch(userId:number):Promise<any>
  {
    return await this.http.get<MatchModel>(usersBaseURL + '/' + userId + '/live' , {observe: 'response'}).toPromise();
  }

  async allMatchResult(userId:number):Promise<any>
  {
    return await this.http.get<MatchModel>(usersBaseURL + '/' + userId + '/result' , {observe: 'response'}).toPromise();
  }

}
