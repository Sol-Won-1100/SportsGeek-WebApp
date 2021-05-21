import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminManageUserComponent } from './admin/admin-manage-user/admin-manage-user.component';
import { AdminManageRechargeComponent } from './admin/admin-manage-recharge/admin-manage-recharge.component';
import { AdminManageTeamComponent } from './admin/admin-manage-team/admin-manage-team.component';
import { AdminManageMatchesComponent } from './admin/admin-manage-matches/admin-manage-matches.component';
import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { LoadingComponent } from './common/components/loading/loading.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './common/components/snackbar/snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpInterceptorService } from './common/service/http-interceptor/http-interceptor.service';
import { UserInsertComponent } from './admin/CRUD/user-insert/user-insert.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './common/guard/auth.guard';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTableFilterModule } from 'mat-table-filter';
import { MatchCRUDComponent } from './admin/CRUD/match-crud/match-crud.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RechargeComponent } from './admin/CRUD/recharge/recharge.component';
import { TeamComponent } from './admin/CRUD/team/team.component';
import { LoginComponent } from './login/login.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatchListComponent } from './user/match-list/match-list.component';
import { LeaderBoardComponent } from './user/leader-board/leader-board.component';
import { BettingPageComponent } from './user/betting-page/betting-page.component';
import { MatSortModule } from '@angular/material/sort';
import { UpdateProfileComponent } from './user/user-profile/update-profile/update-profile.component';
import { ViewUserProfileComponent } from './user/user-profile/view-user-profile/view-user-profile.component';
import { ChangePasswordComponent } from './common/components/change-password/change-password.component';
import { ForgotPasswordComponent } from './common/components/forgot-password/forgot-password.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MyMatchesComponent } from './user/my-matches/my-matches.component';
import { ViewUpcomingMatchComponent } from './user/my-matches/view-upcoming-match/view-upcoming-match.component';
import { ViewLiveMatchesComponent } from './user/my-matches/view-live-matches/view-live-matches.component';
import { ViewOldMatchesComponent } from './user/my-matches/view-old-matches/view-old-matches.component';
import { ViewOthersUserProfileComponent } from './user/user-profile/view-others-user-profile/view-others-user-profile.component';
import { UpdateMatchResultComponent } from './admin/CRUD/update-match-result/update-match-result.component';
import { ConfirmBoxComponent } from './common/components/confirm-box/confirm-box.component';
import {MatCardModule} from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { InsertUpdateContestComponent } from './user/betting-page/insert-update-contest/insert-update-contest.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminManageUserComponent,
    AdminManageRechargeComponent,
    AdminManageTeamComponent,
    AdminManageMatchesComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    NotFoundComponent,
    AdminHomeComponent,
    SnackbarComponent,
    UserInsertComponent,
    MatchCRUDComponent,
    RechargeComponent,
    TeamComponent,
    LoginComponent,
    UserLoginComponent,
    UserDashboardComponent,
    UserRegistrationComponent,
    MatchListComponent,
    LeaderBoardComponent,
    BettingPageComponent,
    UpdateProfileComponent,
    ViewUserProfileComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    MyMatchesComponent,
    ViewUpcomingMatchComponent,
    ViewLiveMatchesComponent,
    ViewOldMatchesComponent,
    ViewOthersUserProfileComponent,
    UpdateMatchResultComponent,
    ConfirmBoxComponent,
    InsertUpdateContestComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    NgbModule,
    FlexLayoutModule,
    MatTableFilterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatRadioModule,
    MatSortModule,
    MatTabsModule,
    MatCardModule,
    LayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
