import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Report} from '../../model/company/report';

@Component({
  selector: 'dialog-report-details',
  templateUrl: './dialog-report-details.component.html',
  styleUrls: ['./dialog-report-details.component.scss']

})
export class DialogReportDetailsComponent {

  constructor(public dialogRef: MatDialogRef<DialogReportDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public report: Report) {
  }

  back(): void {
    this.dialogRef.close();
  }
}
