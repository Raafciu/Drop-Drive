import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../service/company-service/company.service';
import {CompanyAppService} from '../../service/company-service/companyApp.service';
import {CompanyUser} from '../../model/company/companyUser';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  loggedCompanyUser: CompanyUser;

  constructor(private _companyService: CompanyService,
              private _companyAppService: CompanyAppService) {
  }

  ngOnInit(): void {
    if (this.isSignedIn()) {
      const user: CompanyUser = this._companyAppService.getUser();
      if (user.id) {
        this.loggedCompanyUser = user;
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
}
