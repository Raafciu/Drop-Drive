import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API, DELETE_REPORT, REPORTS, REPORTS_BY_CLIENT_REPORTED, SAVE_REPORT} from '../../apiPaths';
import {Report} from '../../model/company/report';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Report[]> {
    return this.http.get<Report[]>(API + REPORTS);
  }

  public save(report: Report) {
    console.log(report);
    return this.http.post<Report>(API + SAVE_REPORT, report);
  }

  public delete(report: Report) {
    console.log(report);
    return this.http.post<Report>(API + DELETE_REPORT, report);
  }

  public findByClientReported(clientReported: string): Observable<Report[]> {
    let httpParams: HttpParams = new HttpParams().set('clientReported', clientReported);
    return this.http.get<Report[]>(API + REPORTS_BY_CLIENT_REPORTED, {params: httpParams});
  }
}
