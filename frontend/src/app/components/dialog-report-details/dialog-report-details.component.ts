import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Report} from '../../model/company/report';
import {DialogReportDetailsInputData} from '../../model/dialogReportDetailsInputData';
import {CompanyUser} from '../../model/company/companyUser';
import {UserTypeEnum} from '../../enums/userTypeEnum';

@Component({
  selector: 'dialog-report-details',
  templateUrl: './dialog-report-details.component.html',
  styleUrls: ['./dialog-report-details.component.scss']

})
export class DialogReportDetailsComponent {

  report: Report;
  loggedUser: CompanyUser;

  constructor(public dialogRef: MatDialogRef<DialogReportDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public inputData: DialogReportDetailsInputData) {
    this.report = inputData.report;
    this.loggedUser = inputData.loggedUser;
    console.log(this.loggedUser);
  }

  back(): void {
    this.dialogRef.close();
  }

  isClient(): boolean {
    return false;
    // return this.loggedUser.userType === UserTypeEnum.KLIENT;
  }
}
