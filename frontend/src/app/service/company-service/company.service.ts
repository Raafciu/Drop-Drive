import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyUser} from '../../model/company/companyUser';
import {API, COMPANY_USERS, DELETE_COMPANY_USER, SAVE_COMPANY_USER} from '../../apiPaths';


@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<CompanyUser[]> {
    return this.http.get<CompanyUser[]>(API + COMPANY_USERS);
  }

  public save(user: CompanyUser) {
    console.log(user);
    return this.http.post<CompanyUser>(API + SAVE_COMPANY_USER, user);
  }

  public delete(user: CompanyUser) {
    console.log(user);
    return this.http.post<CompanyUser>(API + DELETE_COMPANY_USER, user);
  }
}
