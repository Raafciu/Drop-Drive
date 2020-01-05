import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Report} from '../../model/company/report';
import {API, DELETE_NOTE, NOTES, NOTES_BY_REPORT_ID, SAVE_NOTE} from '../../apiPaths';
import {Note} from '../../model/company/note';

@Injectable()
export class NoteService {

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Note[]> {
    return this.http.get<Note[]>(API + NOTES);
  }

  public save(note: Note) {
    console.log(note);
    return this.http.post<Note>(API + SAVE_NOTE, note);
  }

  public delete(note: Note) {
    console.log(note);
    return this.http.post<Report>(API + DELETE_NOTE, note);
  }

  public getNotesByReportId(reportId: string) {
    console.log(reportId);
    let httpParams: HttpParams = new HttpParams().set('reportId', reportId);
    return this.http.get<Note[]>(API + NOTES_BY_REPORT_ID, {params: httpParams});
  }
}
