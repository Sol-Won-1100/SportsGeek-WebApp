import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersBaseURL } from '../../constants/http-urls';
import { UserFutureBets } from '../../model/statistics/user-future-bets';
import { UsersWinningLosingModel } from '../../model/statistics/users-winning-losing-points';
import { UserStats } from '../../model/statistics/userstats';

// let usersBaseURL = 'http://localhost:8081/users';

@Injectable({
  providedIn: 'root'
})
export class UserStaticticsService {

  constructor(private http: HttpClient) { }

  async getUserWinningLosingPoint(userId:number): Promise<any> {
    return await this.http.get<UsersWinningLosingModel>(usersBaseURL + '/' + userId + '/winning-losing-points', { observe: 'response' }).toPromise();
  }

  // async getUserLossingPoint(userId:number): Promise<any> {
  //   return await this.http.get<UsersLoosingModel>(usersBaseURL + '/' + userId + '/loosing-points', { observe: 'response' }).toPromise();
  // }

  async getUserStats(): Promise<any> {
    return await this.http.get<UserStats>(usersBaseURL + '/statistics', { observe: 'response' }).toPromise();
  }

  async getUserStatsById(userId:number): Promise<any> {
    return await this.http.get<UserStats>(usersBaseURL + '/statistics/' + userId, { observe: 'response' }).toPromise();
  }

  async getUserFutureBets(): Promise<any> {
    return await this.http.get<UserFutureBets>(usersBaseURL + '/future-contest', { observe: 'response' }).toPromise();
  }

  async getUserFutureBetsById(userId:number): Promise<any> {
    return await this.http.get<UserFutureBets>(usersBaseURL + '/future-contest/' + userId, { observe: 'response' }).toPromise();
  }
}
