import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { MatchModel } from 'src/app/common/model/match/match-model';
import { MatchesService } from 'src/app/common/service/matches_service/matches.service';

@Component({
  selector: 'app-match-crud',
  templateUrl: './match-crud.component.html',
  styleUrls: ['./match-crud.component.css']
})
export class MatchCRUDComponent implements OnInit {

  matchForm!: FormGroup;
  matchData!: MatchModel;

  constructor(
    private fb: FormBuilder,
    private matchservice: MatchesService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private matDialogRef: MatDialogRef<MatchCRUDComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: MatchModel
  ) {
    this.matchData = data;
    if (data) {
      this.matchForm = this.fb.group({

        matchId: [ this.data.matchId, [Validators.required,Validators.pattern('[0-9]+')] ],

        minimumPoints: [ this.data.minimumPoints ,[Validators.required, Validators.minLength(2)
        , Validators.maxLength(3), Validators.pattern('[0-9]+') ]],

        name: [this.data.name, [Validators.required, Validators.minLength(5)
          , Validators.maxLength(50), Validators.pattern('[a-zA-Z ]+')]],

        startDatetime: [this.data.startDatetime, [Validators.required]],
        
        team1: [this.data.team1Id,[Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[1-9]+')]],

        team2: [this.data.team2Id,[Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[1-9]+')]],

        tournamentId: [this.data.tournamentId ,[Validators.required, Validators.pattern('[1-9]+')]],

        venueId: [this.data.venueId ,[Validators.required, Validators.pattern('[1-9]+')]],

        // winnerTeamId: [this.data.winnerTeamId ,[Validators.required, Validators.pattern('[1-9]+')]]
        
      });
    } else {
      this.matchForm = this.fb.group({

        
        matchId: [ '', [Validators.required,Validators.pattern('[0-9]+')] ],
        
        minimumPoints: [ '' ,[Validators.required, Validators.minLength(2)
        , Validators.maxLength(3)]],

        name: ['', [Validators.required, Validators.minLength(5)
          , Validators.maxLength(50), Validators.pattern('[a-zA-Z ]+')]],

        startDatetime: ['', [Validators.required]],

        team1: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[1-9]+')]],

        team2: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[1-9]+')]],

        tournamentId: ['' ,[Validators.required, Validators.pattern('[1-9]+')]],

        venueId: ['',[Validators.required, Validators.pattern('[1-9]+')]],

        // winnerTeamId: ['',[Validators.required, Validators.pattern('[0-9]+')]]
        
      });
    }
  }

  reload()
  {
    location.reload();
  }


  ngOnInit(): void {
    
  }

  get form() {
    return this.matchForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }


  async addMatch() {
    console.log(this.form.validators);
    
    if (this.matchForm.valid) {
      console.log(this.form.validators);
      if (!this.matchData) {
        this.matchData = new MatchModel();
        this.matchData.matchId = this.form.matchId.value;
        this.matchData.minimumPoints = this.form.minimumPoints.value;
        this.matchData.name = this.form.name.value;
        // this.matchData.startDatetime = this.form.startDatetime.value;
        this.matchData.startDatetime ="2021-07-21T19:30:00";
        this.matchData.team1 = this.form.team1.value;
        this.matchData.team2 = this.form.team2.value;
        this.matchData.tournamentId =this.form.tournamentId.value;
        this.matchData.venueId = this.form.venueId.value;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.matchservice.addMatches(this.matchData);
          this.matchData = resp.body;
          if (this.matchData != null)
          // && this.matchData.matchId > 0
          {
            snackbarMsg = 'Match successfully added!';
            this.matDialogRef.close(this.matchData);
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } catch (ex) {
          snackbarMsg = getErrorMessage(ex);
          panelClass = 'red';
        } finally {
          dialogRef.close();
          if (snackbarMsg) {
            snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
              getSnackbarProperties(snackbarMsg, panelClass));
          }
        }
      } 
      else {
        this.matchData.matchId = this.form.matchId.value;
        this.matchData.minimumPoints = this.form.minimumPoints.value;
        this.matchData.name = this.form.name.value;
        this.matchData.startDatetime = "2021-07-21T19:30:00";


        this.matchData.team1 = this.form.team1.value;


        this.matchData.team2 = this.form.team2.value;

        this.matchData.tournamentId =this.form.tournamentId.value;
        this.matchData.venueId = this.form.venueId.value;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.matchservice.updateMatches(this.matchData.matchId, this.matchData);
          this.matchData = resp.body;
          if (this.matchData != null) {
            snackbarMsg = 'Match successfully updated!';
            this.matDialogRef.close();
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } catch (ex) {
          snackbarMsg = getErrorMessage(ex);
          panelClass = 'red';
        } finally {
          dialogRef.close();
          if (snackbarMsg) {
            snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
              getSnackbarProperties(snackbarMsg, panelClass));
          }
        }
      }
    }
  }

  closeDialogBox() {
    this.matDialogRef.close();
  }

}
