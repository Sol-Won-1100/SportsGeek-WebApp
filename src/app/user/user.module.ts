import { InsertUpdateContestComponent } from './betting-page/insert-update-contest/insert-update-contest.component';
import { ViewOthersUserProfileComponent } from './user-profile/view-others-user-profile/view-others-user-profile.component';
import { ViewOldMatchesComponent } from './my-matches/view-old-matches/view-old-matches.component';
import { ViewLiveMatchesComponent } from './my-matches/view-live-matches/view-live-matches.component';
import { ViewUpcomingMatchComponent } from './my-matches/view-upcoming-match/view-upcoming-match.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { ViewUserProfileComponent } from './user-profile/view-user-profile/view-user-profile.component';
import { UpdateProfileComponent } from './user-profile/update-profile/update-profile.component';
import { BettingPageComponent } from './betting-page/betting-page.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { MatchListComponent } from './match-list/match-list.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AgmCoreModule } from '@agm/core';
import { MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatTableFilterModule } from 'mat-table-filter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {} from 'googlemaps';

console.log("user module loaded");

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserRegistrationComponent,
    MatchListComponent,
    LeaderBoardComponent,
    BettingPageComponent,
    UpdateProfileComponent,
    ViewUserProfileComponent,
    MyMatchesComponent,
    ViewUpcomingMatchComponent,
    ViewLiveMatchesComponent,
    ViewOldMatchesComponent,
    ViewOthersUserProfileComponent,
    InsertUpdateContestComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    // BrowserAnimationsModule,
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
    LayoutModule,
    MatSelectModule,
    NgxMatFileInputModule,
    MatAutocompleteModule,
    MatRippleModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD3saA5pXYFGE4O6qGpST_8cKDmY_NxCBw"
    })
  ]
})
export class UserModule { }
