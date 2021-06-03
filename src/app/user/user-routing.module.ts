import { RulesComponent } from './../common/components/footer/rules/rules.component';
import { ContactUsComponent } from './../common/components/footer/contact-us/contact-us.component';
import { AboutUsComponent } from './../common/components/footer/about-us/about-us.component';
import { ViewOldMatchesComponent } from './my-matches/view-old-matches/view-old-matches.component';
import { ViewLiveMatchesComponent } from './my-matches/view-live-matches/view-live-matches.component';
import { ViewUpcomingMatchComponent } from './my-matches/view-upcoming-match/view-upcoming-match.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { BettingPageComponent } from './betting-page/betting-page.component';
import { AuthGuard } from './../common/guard/auth.guard';
import { ViewOthersUserProfileComponent } from './user-profile/view-others-user-profile/view-others-user-profile.component';
import { ViewUserProfileComponent } from './user-profile/view-user-profile/view-user-profile.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { MatchListComponent } from './match-list/match-list.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: UserDashboardComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'match-list', component: MatchListComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'leader-board', component: LeaderBoardComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'view-your-profile', component: ViewUserProfileComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'view-users-profile/:id', component: ViewOthersUserProfileComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'match-list/betting-page/:id', component: BettingPageComponent, canActivate: [AuthGuard], data: { roles: ['User'] }},
  { path: 'my-matches', component: MyMatchesComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'my-matches/view-upcoming-match/:id', component: ViewUpcomingMatchComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'my-matches/view-live-match/:id', component: ViewLiveMatchesComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'my-matches/view-old-match/:id', component: ViewOldMatchesComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'contact-us', component: ContactUsComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'rules', component: RulesComponent, canActivate: [AuthGuard]  , data: { roles: ['User'] }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
