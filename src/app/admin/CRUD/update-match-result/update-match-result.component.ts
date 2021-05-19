import { Optional } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { MatchResult } from 'src/app/common/model/match/update-winner-team';
import { MatchesService } from 'src/app/common/service/matches_service/matches.service';

@Component({
  selector: 'app-update-match-result',
  templateUrl: './update-match-result.component.html',
  styleUrls: ['./update-match-result.component.css']
})
export class UpdateMatchResultComponent implements OnInit {

  matchResultForm!: FormGroup;
  matchResultData!: MatchResult;

  constructor(
    private fb: FormBuilder,
    private matchservice: MatchesService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private matDialogRef: MatDialogRef<UpdateMatchResultComponent>,
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: MatchResult
  ) {
    // this.matchResultData = this.matchResultData;
    if (this.matchResultData) {
      this.matchResultForm = this.fb.group({

        matchId: [ this.matchResultData.matchId, [Validators.required,Validators.pattern('[0-9]+')] ],

        resultStatus: [ this.matchResultData.resultStatus ,[Validators.required, Validators.pattern('[0-2]+') ]],
        
        winnerTeamId: [this.matchResultData.winnerTeamId,[Validators.required, Validators.pattern('[1-9]+')]],
        
      });
    } else {
      this.matchResultForm = this.fb.group({

        
        matchId: ['', [Validators.required,Validators.pattern('[0-9]+')] ],

        resultStatus: ['' ,[Validators.required, Validators.pattern('[0-2]+') ]],

        
        winnerTeamId: ['',[Validators.required, Validators.pattern('[0-9]+')]],
        
      });
    }
  }

  reload()
  {
    location.reload();
  }


  async ngOnInit() {
    // this.matchResultData = await this.updateResult();
  }

  get form() {
    return this.matchResultForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }


  async updateResult() {
    console.log(this.form.validators);
    
    if (this.matchResultForm.valid) {
      console.log(this.form.validators);
      if (!this.matchResultData) {

        this.matchResultData = new MatchResult();
        this.matchResultData.matchId = this.form.matchId.value;
        this.matchResultData.resultStatus = this.form.resultStatus.value;       
        this.matchResultData.winnerTeamId = this.form.winnerTeamId.value;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          // resp = await this.matchservice.addMatches(this.matchResultData);
          resp = await this.matchservice.updateMatchResult(this.matchResultData.matchId,this.matchResultData.resultStatus,this.matchResultData.winnerTeamId);
          this.matchResultData = resp.body;
          if (this.matchResultData != null && this.matchResultData.matchId > 0)
          // && this.matchResultData.matchId > 0
          {
            snackbarMsg = 'Match Result Successfully Updated!';
            this.matDialogRef.close(this.matchResultData);
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } catch (ex) {
          snackbarMsg = getErrorMessage(ex);
          panelClass = 'red';
        } finally {
          dialogRef.close();
          this.matDialogRef.close(this.matchResultData);
          if (snackbarMsg) {
            snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
              getSnackbarProperties(snackbarMsg, panelClass));
          }
        }
      } 
      else {
       console.log("wrong");
       
         }
    }
  }

  closeDialogBox() {
    this.matDialogRef.close();
  }


}
