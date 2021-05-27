import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxComponent } from 'src/app/common/components/confirm-box/confirm-box.component';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { getErrorMessage, NO_RESP } from 'src/app/common/constants/error-message';
import { getSnackbarProperties } from 'src/app/common/constants/snackbar-properties';
import { RechargeModel } from 'src/app/common/model/recharge/recharge-model';
import { RechargeService } from 'src/app/common/service/recharge_service/recharge.service';
import { RechargeComponent } from '../CRUD/recharge/recharge.component';

@Component({
  selector: 'app-admin-manage-recharge',
  templateUrl: './admin-manage-recharge.component.html',
  styleUrls: ['./admin-manage-recharge.component.css']
})
export class AdminManageRechargeComponent implements OnInit {

  rechargeData: RechargeModel[] = [];

  displayedColumns: string[] = ['rechargeId', 'userId', 'userName', 'points', 'rechargeDate', 'delete'];

  dataSource: MatTableDataSource<RechargeModel> = new MatTableDataSource();
  // dataSource = new MatTableDataSource<RechargeModel>(this.rechargeData);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private rechargeservice: RechargeService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  async ngOnInit() {

    this.rechargeData = await this.getRecharge();
    console.log(this.rechargeData);

    this.dataSource.data = this.rechargeData;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteRecharge(rechargeData: RechargeModel): Promise<any> {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef1 = this.dialog.open(ConfirmBoxComponent, {
        panelClass: 'no-padding-dialog',
        data: 'Think Twice Before Deleting'
      });
      const closeResp = await dialogRef1.afterClosed().toPromise();
      if (closeResp) {
        let panelClass = 'green';
        let snackbarMsg = '';
        let snackbarRef = null;
        const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
        // let recharegeModel: RechargeModel[] = [];
        let msg;
        let resp = null;
        try {
          resp = await this.rechargeservice.deleteRecharge(rechargeData.rechargeId);
          msg = resp.body.message;
          if (msg) {
            dialogRef.close();
            snackbarMsg = msg;
            location.reload();
          } else {
            snackbarMsg = NO_RESP;
            panelClass = 'red';
          }
        } catch (ex) {
          snackbarMsg = getErrorMessage(ex);
          panelClass = 'red';
        } finally {
          dialogRef.close();
        }
        if (snackbarMsg) {
          snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
            getSnackbarProperties(snackbarMsg, panelClass));
        }
        return [];
      }
    }
  }

  async getRecharge(): Promise<any> {
    let panelClass = 'green';
    let snackbarMsg = '';
    let snackbarRef = null;
    const dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
    let rechargeModel: RechargeModel[] = [];
    let resp = null;
    try {
      resp = await this.rechargeservice.getAllRecharge();
      rechargeModel = resp.body;
      if (rechargeModel) {
        dialogRef.close();
        return rechargeModel;
      } else {
        snackbarMsg = NO_RESP;
        panelClass = 'red';
      }
    } catch (ex) {
      snackbarMsg = getErrorMessage(ex);
      panelClass = 'red';
    } finally {
      dialogRef.close();
    }
    if (snackbarMsg) {
      snackbarRef = this.snackbar.openFromComponent(SnackbarComponent,
        getSnackbarProperties(snackbarMsg, panelClass));
    }
    return [];
  }


  openRechargeForm() {
    const dialogRef = this.dialog.open(RechargeComponent,
      { panelClass: 'no-padding-dialog', disableClose: true });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.rechargeData.push(data);
        this.dataSource.data = this.rechargeData;
        location.reload();
      }
    });
  }
  updateRechargeForm(data: any) {
    const dialogRef = this.dialog.open(RechargeComponent,
      { panelClass: 'no-padding-dialog', disableClose: true, data });
    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.rechargeData.push(data);
        this.dataSource.data = this.rechargeData;
      }
    });
  }

}
