import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contestBaseURL, matchBaseURL, usersBaseURL } from '../../constants/http-urls';
import { BotModel } from '../../model/bot/BotModel';

// let contestBaseURL = 'http://localhost:8081/contest';
// let contestBaseURL = 'http://localhost:8080/contest';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http:HttpClient) { }

  async viewAllContestByMatchId(matchId:number):Promise<any>
  {
    return await this.http.get<BotModel>(matchBaseURL + '/' + matchId + '/contest', {observe: 'response'}).toPromise();
  }

  async viewAllContestByUserAndMatchId(userId:number,matchId:number):Promise<any>
  {
    return await this.http.get<BotModel>(usersBaseURL + '/' + userId + '/contest/' + matchId, {observe: 'response'}).toPromise();
  }

  async addBet(botModel:BotModel):Promise<any>
  {
    return await this.http.post<BotModel>(contestBaseURL , botModel,{observe:'response'}).toPromise();
  }

  async updateBet(contestId:number, botModel:BotModel):Promise<any> 
  {
    return await this.http.put<BotModel>(contestBaseURL + '/' + contestId , botModel , {observe:'response'}).toPromise();
  }

}
