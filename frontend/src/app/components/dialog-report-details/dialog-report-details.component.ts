import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Report} from '../../model/company/report';
import {DialogReportDetailsInputData} from '../../model/dialogReportDetailsInputData';
import {CompanyUser} from '../../model/company/companyUser';
import {ReportStatusEnum} from '../../enums/reportStatusEnum';
import {ReportService} from '../../service/company-service/report.service';
import {NotificationService} from '../../service/notification.service';
import {Note} from '../../model/company/note';
import {NoteService} from '../../service/company-service/note.service';
import * as moment from 'moment';
import {UserTypeEnum} from '../../enums/userTypeEnum';

@Component({
  selector: 'dialog-report-details',
  templateUrl: './dialog-report-details.component.html',
  styleUrls: ['./dialog-report-details.component.scss']

})
export class DialogReportDetailsComponent {

  report: Report;
  loggedUser: CompanyUser;
  open = ReportStatusEnum.OTWARTE;
  inProgress = ReportStatusEnum.W_TRAKCIE_REALIZACJI;
  closed = ReportStatusEnum.ZAMKNIETE;


  constructor(public dialogRef: MatDialogRef<DialogReportDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public inputData: DialogReportDetailsInputData,
              private _reportService: ReportService,
              private _notificationService: NotificationService,
              private _noteService: NoteService) {
    this.report = inputData.report;
    this.loggedUser = inputData.loggedUser;
  }

  back(): void {
    this.dialogRef.close();
  }

  isClient(): boolean {
    return this.loggedUser.userType === UserTypeEnum.KLIENT;
  }

  changeStatus(status: ReportStatusEnum) {
    let report: Report;
    report = this.report;
    report.status = status;

    this._reportService.save(report).subscribe(() => {
      this._notificationService.success('Zmieniono status na ' + status);
    }, error => this._notificationService.error('Wystąpił błąd, prosimy spróbować ponownie później'));

    let note: Note = new Note();
    note.reportId = this.report.id;
    note.owner = this.loggedUser.username;
    note.date = moment().format('YYYY-MM-DD HH:mm:ss');
    note.description = 'Użytkownik zmienił status na ' + status;

    this._noteService.save(note).subscribe(() => {

    }, error => this._notificationService.error('Wystąpił błąd, prosimy spróbować ponownie później'));
  }
}
