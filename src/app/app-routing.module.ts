import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminManageMatchesComponent } from './admin/admin-manage-matches/admin-manage-matches.component';
import { AdminManageOldMatchesComponent } from './admin/admin-manage-old-matches/admin-manage-old-matches.component';
import { AdminManageRechargeComponent } from './admin/admin-manage-recharge/admin-manage-recharge.component';
import { AdminManageTeamComponent } from './admin/admin-manage-team/admin-manage-team.component';
import { AdminManageUserComponent } from './admin/admin-manage-user/admin-manage-user.component';
import { ForgotPasswordComponent } from './common/components/forgot-password/forgot-password.component';
import { LoadingComponent } from './common/components/loading/loading.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { AuthGuard } from './common/guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { BettingPageComponent } from './user/betting-page/betting-page.component';
import { AboutUsComponent } from './user/footer/about-us/about-us.component';
import { ContactUsComponent } from './user/footer/contact-us/contact-us.component';
import { RulesComponent } from './user/footer/rules/rules.component';
import { LeaderBoardComponent } from './user/leader-board/leader-board.component';
import { MatchListComponent } from './user/match-list/match-list.component';
import { MyMatchesComponent } from './user/my-matches/my-matches.component';
import { ViewLiveMatchesComponent } from './user/my-matches/view-live-matches/view-live-matches.component';
import { ViewOldMatchesComponent } from './user/my-matches/view-old-matches/view-old-matches.component';
import { ViewUpcomingMatchComponent } from './user/my-matches/view-upcoming-match/view-upcoming-match.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { ViewOthersUserProfileComponent } from './user/user-profile/view-others-user-profile/view-others-user-profile.component';
import { ViewUserProfileComponent } from './user/user-profile/view-user-profile/view-user-profile.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'adminHome',
    component: AdminHomeComponent,
    canActivate: [AuthGuard]
  },
  {path : 'login' , component : LoginComponent},
  {path : 'register' , component : UserRegistrationComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },  
  { path: 'Admin/home', component: AdminHomeComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'Admin/manage-matches', component: AdminManageMatchesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'Admin/manage-old-matches', component: AdminManageOldMatchesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'Admin/manage-recharge', component: AdminManageRechargeComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'Admin/manage-team', component: AdminManageTeamComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'Admin/manage-user', component: AdminManageUserComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'loading', component: LoadingComponent },  
  { path: 'User/home', component: UserDashboardComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/match-list', component: MatchListComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/leader-board', component: LeaderBoardComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/view-your-profile', component: ViewUserProfileComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/view-users-profile/:id', component: ViewOthersUserProfileComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/match-list/betting-page/:id', component: BettingPageComponent, canActivate: [AuthGuard], data: { roles: ['User'] }},
  { path: 'User/my-matches', component: MyMatchesComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/my-matches/view-upcoming-match/:id', component: ViewUpcomingMatchComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/my-matches/view-live-match/:id', component: ViewLiveMatchesComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/my-matches/view-old-match/:id', component: ViewOldMatchesComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/about-us', component: AboutUsComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/contact-us', component: ContactUsComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  { path: 'User/rules', component: RulesComponent, canActivate: [AuthGuard], data: { roles: ['User'] }  },
  
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
