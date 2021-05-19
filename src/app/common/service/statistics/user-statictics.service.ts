import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersBaseURL } from '../../constants/http-urls';
import { UserFutureBets } from '../../model/statistics/user-future-bets';
import { UsersLoosingModel } from '../../model/statistics/users-loosing-points';
import { UsersWinningModel } from '../../model/statistics/users-winning-points';
import { UserStats } from '../../model/statistics/userstats';

// let usersBaseURL = 'http://localhost:8081/users';

@Injectable({
  providedIn: 'root'
})
export class UserStaticticsService {

  constructor(private http: HttpClient) { }

  async getUserWinningPoint(userId:number): Promise<any> {
    return await this.http.get<UsersWinningModel>(usersBaseURL + '/' + userId + '/winning-points', { observe: 'response' }).toPromise();
  }

  async getUserLossingPoint(userId:number): Promise<any> {
    return await this.http.get<UsersLoosingModel>(usersBaseURL + '/' + userId + '/loosing-points', { observe: 'response' }).toPromise();
  }

  async getUserStats(): Promise<any> {
    return await this.http.get<UserStats>(usersBaseURL + '/statistics', { observe: 'response' }).toPromise();
  }

  async getUserFutureBets(): Promise<any> {
    return await this.http.get<UserFutureBets>(usersBaseURL + '/future-contest', { observe: 'response' }).toPromise();
  }
}
