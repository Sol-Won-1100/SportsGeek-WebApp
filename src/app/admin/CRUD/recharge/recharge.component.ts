import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { RechargeModel } from 'src/app/common/model/recharge/recharge-model';
import { RechargeService } from 'src/app/common/service/recharge_service/recharge.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  rechargeForm!: FormGroup;
  rechargeData!: RechargeModel;

  constructor(
    private fb: FormBuilder,
    private rechargeservice: RechargeService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private matDialogRef: MatDialogRef<RechargeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RechargeModel
  ) {
    this.rechargeData = data;
    if (data) {
      this.rechargeForm = this.fb.group({
        rechargeId: [{ value: this.data.rechargeId, disabled: true }],
        
        userId: [this.data.userId, [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9 ]+')]],
        points: [this.data.points, [Validators.required, Validators.minLength(3), Validators.maxLength(4), Validators.pattern('[0-9]+')]],
        // rechargeDate: [this.data.rechargeDate, [Validators.required]]
        
      });
    } else {
      this.rechargeForm = this.fb.group({

        rechargeId: [{ disabled: true }],
        userId: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]+')]],
        points: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4), Validators.pattern('[0-9]+')]],
        // rechargeDate: ['', [Validators.required]]
      
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
    return this.rechargeForm.controls;
  }

  reset(field: string) {
    this.form[field].setValue('');
  }


  async addRecharge() {
    if (this.rechargeForm.valid) {
      if (!this.rechargeData) {
        this.rechargeData = new RechargeModel();
        this.rechargeData.rechargeId = 0;
        this.rechargeData.userId = this.form.userId.value;
        this.rechargeData.points = this.form.points.value;
        // this.rechargeData.rechargeDate = this.form.rechargeDate.value;
        
        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.rechargeservice.addRecharge(this.rechargeData);
          this.rechargeData = resp.body;
          if (this.rechargeData != null && this.rechargeData.rechargeId > 0) {
            snackbarMsg = 'Recharge successfully Done!';
            this.matDialogRef.close(this.rechargeData);
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
      } else {
        this.rechargeData.userId = this.form.userId.value;
        this.rechargeData.points = this.form.points.value;
        // this.rechargeData.rechargeDate = this.form.rechargeDate.value;
        
        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        this.snackbar.dismiss();
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        let resp = null;
        try {
          resp = await this.rechargeservice.updateRecharge(this.rechargeData.rechargeId, this.rechargeData);
          this.rechargeData = resp.body
          if (this.rechargeData != null) {
            snackbarMsg = 'Recharge successfully updated!';
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
