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
import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManageUserComponent } from './admin-manage-user/admin-manage-user.component';
import { AdminManageRechargeComponent } from './admin-manage-recharge/admin-manage-recharge.component';
import { AdminManageTeamComponent } from './admin-manage-team/admin-manage-team.component';
import { AdminManageMatchesComponent } from './admin-manage-matches/admin-manage-matches.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserInsertComponent } from './CRUD/user-insert/user-insert.component';
import { MatchCRUDComponent } from './CRUD/match-crud/match-crud.component';
import { RechargeComponent } from './CRUD/recharge/recharge.component';
import { TeamComponent } from './CRUD/team/team.component';
import { UpdateMatchResultComponent } from './CRUD/update-match-result/update-match-result.component';
import { AssignRoleComponent } from './CRUD/assign-role/assign-role.component';
import { AdminManageOldMatchesComponent } from './admin-manage-old-matches/admin-manage-old-matches.component';
import {} from 'googlemaps';

console.log("admin module loaded");

@NgModule({
  declarations: [
    AdminManageUserComponent,
    AdminManageRechargeComponent,
    AdminManageTeamComponent,
    AdminManageMatchesComponent,
    AdminHomeComponent,
    UserInsertComponent,
    MatchCRUDComponent,
    RechargeComponent,
    TeamComponent,
    UpdateMatchResultComponent,
    AdminManageOldMatchesComponent,
    AssignRoleComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // BrowserModule,
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
export class AdminModule { }
