import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TournamentModel } from '../../model/tournament/tournament';
import { tournamentBaseURL } from '../../constants/http-urls';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(
    private http: HttpClient
  ) { }

  async getAllTournament(): Promise<any> {
    return await this.http.get<TournamentModel>(tournamentBaseURL, { observe: 'response' }).toPromise();
  }

}
