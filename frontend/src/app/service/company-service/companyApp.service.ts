import {Injectable} from '@angular/core';
import {CompanyUser} from '../../model/company/companyUser';
import {CompanyService} from './company.service';

const COMPANY_USER = 'COMPANY_USER';

@Injectable()
export class CompanyAppService {

  constructor(private _companyService: CompanyService) {
  }

  getUser(): CompanyUser {
    const data = localStorage.getItem(COMPANY_USER);
    if (data) {
      return JSON.parse(data);
    } else {
      return new CompanyUser();
    }
  }

  saveUser(user: CompanyUser) {
    localStorage.setItem(COMPANY_USER, JSON.stringify(user));
  }

  deleteUser() {
    localStorage.removeItem(COMPANY_USER);
  }

  isUserSignedIn(): boolean {
    return this.getUser().id !== undefined;
  }
}
