import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { TeamModel } from 'src/app/common/model/team/team-model';
import { TeamService } from 'src/app/common/service/team_service/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamForm!: FormGroup;
  teamData!: TeamModel;

  constructor(
    private fb: FormBuilder,
    private teamservice: TeamService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private matDialogRef: MatDialogRef<TeamComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TeamModel
  ) {
    this.teamData = data;
    if (data) {
      this.teamForm = this.fb.group({
        teamId: [{ value: this.data.teamId, disabled: true }],

        name: [this.data.name, [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]+')]],

        shortName: [this.data.shortName, [Validators.required, Validators.maxLength(5)]],

        teamLogo: [this.data.teamLogo, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],

        // createdOn: [this.data.createdOn, [Validators.required]],

      });
    } else {
      this.teamForm = this.fb.group({

        name: ['', [Validators.required, Validators.minLength(5) , Validators.maxLength(50), Validators.pattern('[a-zA-Z ]+')]],

        shortName: ['', [Validators.required, Validators.maxLength(5)]],

        teamLogo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],

        // createdOn: ['', [Validators.required]],

      });
    }
  }

  reload() {
    location.reload();
  }


  ngOnInit(): void {

  }

  get form() {
    return this.teamForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }


  async addTeam() {
    console.log(this.form.validators);

    if (this.teamForm.valid) {
      console.log(this.form.validators);
      if (!this.teamData) {
        this.teamData = new TeamModel();
        this.teamData.teamId = 0;
        this.teamData.name = this.form.name.value;
        this.teamData.shortName = this.form.shortName.value;
        this.teamData.teamLogo = this.form.teamLogo.value;
        // this.teamData.createdOn = this.form.createdOn.value;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.teamservice.addTeam(this.teamData);
          this.teamData = resp.body;
          if (this.teamData != null && this.teamData.teamId > 0) {
            snackbarMsg = 'User successfully added!';
            this.matDialogRef.close(this.teamData);
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
        this.teamData.name = this.form.name.value;
        this.teamData.shortName = this.form.shortName.value;
        this.teamData.teamLogo = this.form.teamLogo.value;
        // this.teamData.createdOn = this.form.createdOn.value;

        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.teamservice.updateTeam(this.teamData.teamId, this.teamData);
          this.teamData = resp.body;
          if (this.teamData != null) {
            snackbarMsg = 'Team successfully updated!';
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
