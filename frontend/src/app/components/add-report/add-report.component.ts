import {FormControl, FormGroup} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../service/notification.service';
import {Report} from '../../model/company/report';
import {ReportStatusEnum} from '../../enums/reportStatusEnum';
import {CompanyUser} from '../../model/company/companyUser';
import {CompanyAppService} from '../../service/company-service/companyApp.service';
import {ReportService} from '../../service/company-service/report.service';
import * as moment from 'moment';

@Component({
  selector: 'add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {

  loggedCompanyUser: CompanyUser;

  form: FormGroup;

  nameFC: FormControl;
  shortDescriptonFC: FormControl;
  descriptionFC: FormControl;
  priorityFC: FormControl;
  expirationDateFC: FormControl;

  constructor(private _notificationService: NotificationService,
              private _companyAppService: CompanyAppService,
              private _reportService: ReportService) {

    this.nameFC = new FormControl('');
    this.shortDescriptonFC = new FormControl('');
    this.descriptionFC = new FormControl('');
    this.priorityFC = new FormControl('');
    this.expirationDateFC = new FormControl('');

    this.form = new FormGroup({
      nameFC: this.nameFC,
      shortDescriptonFC: this.shortDescriptonFC,
      descriptionFC: this.descriptionFC,
      priorityFC: this.priorityFC,
      expirationDateFC: this.expirationDateFC
    });
  }

  ngOnInit(): void {
    if (this._companyAppService.isUserSignedIn()) {
      const user: CompanyUser = this._companyAppService.getUser();
      if (user.id) {
        this.loggedCompanyUser = user;
      }
    }
  }

  submit() {
    if (this.isAllFieldsFilled()) {

      let report: Report = new Report();
      report.name = this.nameFC.value;
      report.shortDescription = this.shortDescriptonFC.value;
      report.description = this.descriptionFC.value;
      report.prority = this.priorityFC.value;
      report.status = ReportStatusEnum.OTWARTE;
      report.expirationDateTime = moment().format('YYYY/MM/DD HH:mm:ss');
      report.status = null;
      report.clientReported = this.loggedCompanyUser.username;

      this._reportService.save(report).subscribe(() => {
        this._notificationService.success('Dodano zgłoszenie');
      }, error => this._notificationService.error('Wystąpił błąd, prosimy spróbować ponownie później'));
    } else {
      this._notificationService.error('Wypełnij wszystkie pola');
    }
    // window.location.reload();
  }

  isAllFieldsFilled() {
    return this.form.valid
      && this.nameFC.value
      && this.shortDescriptonFC.value
      && this.descriptionFC.value
      && this.priorityFC.value
      && this.expirationDateFC.value;
  }
}
