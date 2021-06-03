import { ViewOldMatchesComponent } from './../user/my-matches/view-old-matches/view-old-matches.component';
import { ViewLiveMatchesComponent } from './../user/my-matches/view-live-matches/view-live-matches.component';
import { ViewUpcomingMatchComponent } from './../user/my-matches/view-upcoming-match/view-upcoming-match.component';
import { MyMatchesComponent } from './../user/my-matches/my-matches.component';
import { BettingPageComponent } from './../user/betting-page/betting-page.component';
import { ViewOthersUserProfileComponent } from './../user/user-profile/view-others-user-profile/view-others-user-profile.component';
import { ViewUserProfileComponent } from './../user/user-profile/view-user-profile/view-user-profile.component';
import { LeaderBoardComponent } from './../user/leader-board/leader-board.component';
import { MatchListComponent } from './../user/match-list/match-list.component';
import { RulesComponent } from './../common/components/footer/rules/rules.component';
import { ContactUsComponent } from './../common/components/footer/contact-us/contact-us.component';
import { AboutUsComponent } from './../common/components/footer/about-us/about-us.component';
import { AdminManageUserComponent } from './admin-manage-user/admin-manage-user.component';
import { AdminManageTeamComponent } from './admin-manage-team/admin-manage-team.component';
import { AdminManageRechargeComponent } from './admin-manage-recharge/admin-manage-recharge.component';
import { AuthGuard } from './../common/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminManageMatchesComponent } from './admin-manage-matches/admin-manage-matches.component';
import { AdminManageOldMatchesComponent } from './admin-manage-old-matches/admin-manage-old-matches.component';

const routes: Routes = [
  
  { path: 'home', component: AdminHomeComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'manage-matches', component: AdminManageMatchesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'manage-old-matches', component: AdminManageOldMatchesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'manage-recharge', component: AdminManageRechargeComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'manage-team', component: AdminManageTeamComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'manage-user', component: AdminManageUserComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
  { path: 'contact-us', component: ContactUsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
  { path: 'rules', component: RulesComponent, canActivate: [AuthGuard]  , data: { roles: ['Admin'] }},
  { path: 'match-list', component: MatchListComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
  { path: 'leader-board', component: LeaderBoardComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
  { path: 'view-your-profile', component: ViewUserProfileComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
  { path: 'view-users-profile/:id', component: ViewOthersUserProfileComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
  { path: 'match-list/betting-page/:id', component: BettingPageComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  { path: 'my-matches', component: MyMatchesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
  { path: 'my-matches/view-upcoming-match/:id', component: ViewUpcomingMatchComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
  { path: 'my-matches/view-live-match/:id', component: ViewLiveMatchesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
  { path: 'my-matches/view-old-match/:id', component: ViewOldMatchesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
