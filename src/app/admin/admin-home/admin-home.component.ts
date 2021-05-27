import { Component, OnInit } from '@angular/core';
import { MatchModel } from 'src/app/common/model/match/match-model';
import { TeamModel } from 'src/app/common/model/team/team-model';
import { UserModel } from 'src/app/common/model/user/user-model';
import { VenueModel } from 'src/app/common/model/venue/venue';
import { MatchesService } from 'src/app/common/service/matches_service/matches.service';
import { TeamService } from 'src/app/common/service/team_service/team.service';
import { UserService } from 'src/app/common/service/user_service/user.service';
import { VenueService } from 'src/app/common/service/venue/venue.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  userData: UserModel[] = [];
  allMatch: MatchModel[] = [];
  oldMatchData: MatchModel[] = [];
  upcomingMatches: MatchModel[] = [];
  teamData: TeamModel[] = [];
  venueData: VenueModel[]=[];

  constructor(
    private teamservice: TeamService,
    private userservice: UserService,
    private venueservice:VenueService,
    private matchservice: MatchesService,
  ) { }

  async ngOnInit() {
    this.userData = await this.getUsers();
    console.log(this.userData);

    this.allMatch = await this.getMatches();
    console.log(this.allMatch);

    this.oldMatchData = await this.getOldMatches();
    console.log(this.oldMatchData);

    this.upcomingMatches = await this.getMatchDetails();
    console.log(this.upcomingMatches); 

    this.teamData = await this.getTeams();
    console.log(this.teamData);

    this.venueData = await this.getVenue();
    console.log(this.venueData);

  }

  async getUsers(): Promise<any> {
    
    let userModel: UserModel[] = [];
    let resp = null;
      resp = await this.userservice.getAllUser();
      userModel = resp.body;
      if (userModel) {
        return userModel;
      }
    return [];
  }

  async getMatches(): Promise<any> {
    let matchModel: MatchModel[] = [];
    let resp = null;
      resp = await this.matchservice.getAllMatches();
      matchModel = resp.body;
      if (matchModel) {
        return matchModel;
      }
    return [];
  }

  async getOldMatches(): Promise<any> {   
    let matchModel: MatchModel[] = [];
    let resp = null;
      resp = await this.matchservice.getAllOldMatches();
      matchModel = resp.body;
      if (matchModel) {
        return matchModel;
      }
    return [];
  }

  async getMatchDetails(): Promise<any> {
    let matchModel: MatchModel[] = [];
    let resp = null;
      resp = await this.matchservice.getAllUpcomingMatches();
      matchModel = resp.body;
      if (matchModel) {
        return matchModel;
      }
    return [];
  }

  async getTeams(): Promise<any> {
  
    let teamModel: TeamModel[] = [];
    let resp = null;
      resp = await this.teamservice.getAllTeams();
      teamModel = resp.body;
      if (teamModel) {
        return teamModel;
      } 
    return [];
  }

  async getVenue(): Promise<any> {
    
    let venueModel: VenueModel[] = [];
    let resp = null;
      resp = await this.venueservice.getAllVenue();
      venueModel = resp.body;
      if (venueModel) {
        return venueModel;
      }
    return [];
  }

}
