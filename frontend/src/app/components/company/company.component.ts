import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../service/company-service/company.service';
import {CompanyAppService} from '../../service/company-service/companyApp.service';
import {CompanyUser} from '../../model/company/companyUser';
import {Report} from '../../model/company/report';
import {ReportService} from '../../service/company-service/report.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DialogReportDetailsComponent} from '../dialog-report-details/dialog-report-details.component';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  loggedCompanyUser: CompanyUser;
  reports: Report[] = [];
  dataSource: MatTableDataSource<Report>;
  displayedColumns: string[] = ['name', 'shortDescription', 'status', 'prority', 'expirationDateTime', 'clientReported', 'details'];

  constructor(private _companyService: CompanyService,
              private _companyAppService: CompanyAppService,
              private _reportService: ReportService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.isSignedIn()) {
      const user: CompanyUser = this._companyAppService.getUser();
      if (user.id) {
        this.loggedCompanyUser = user;
        this.refreshReports();
      }
    }
  }

  isSignedIn() {
    return this._companyAppService.isUserSignedIn();
  }

  signOut() {
    this._companyAppService.deleteUser();
    window.location.reload();
  }

  isClient() {
    //TODO potem do zmiany
    return true;
    // return this.loggedCompanyUser.userType === UserTypeEnum.KLIENT;
  }

  refreshReports() {
    if (!this.isClient()) {
      this._reportService.findAll().subscribe(reports => {
        this.reports = reports;
        console.log(this.reports);
        this.dataSource = new MatTableDataSource(this.reports);
      });
    } else {
      this._reportService.findByClientReported(this.loggedCompanyUser.username).subscribe(reports => {
        this.reports = reports;
        console.log(this.reports);
        this.dataSource = new MatTableDataSource(this.reports);
      });
    }
  }

  showDetails(report: Report) {
    const dialogRef = this.dialog.open(DialogReportDetailsComponent, {
      height: '500px',
      minWidth: '60%',
      data: report
    });
  }
}
