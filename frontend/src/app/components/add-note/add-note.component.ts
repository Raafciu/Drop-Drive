import {Component, Input, OnInit} from '@angular/core';
import {CompanyUser} from '../../model/company/companyUser';
import {NotificationService} from '../../service/notification.service';
import {Note} from '../../model/company/note';
import {FormControl, FormGroup} from '@angular/forms';

import {NoteService} from '../../service/company-service/note.service';
import * as moment from 'moment';


@Component({
  selector: 'add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  @Input() reportId: string;
  @Input() loggedUser: CompanyUser;

  notes: Note[] = [];

  form: FormGroup;
  descriptionFC: FormControl;

  constructor(private _notificationService: NotificationService,
              private _noteService: NoteService) {

    this.descriptionFC = new FormControl('');

    this.form = new FormGroup({
      descriptionFC: this.descriptionFC
    });
  }

  ngOnInit(): void {
    console.log(this.loggedUser);
    this.getNotesByReportId();
  }

  addNote() {
    if (this.form.valid && this.descriptionFC.value) {

      let note: Note = new Note();
      note.description = this.descriptionFC.value;
      note.date = moment().format('YYYY-MM-DD HH:mm:ss');
      note.owner = this.loggedUser.username;
      note.reportId = this.reportId;
      console.log(note);

      this._noteService.save(note).subscribe(() => {
        this._notificationService.success('Dodano notatkę');
        this.getNotesByReportId();
        this.form.reset();
      }, error => this._notificationService.error('Wystąpił błąd, prosimy spróbować ponownie później'));
    } else {
      this._notificationService.error('Podaj treść notatki');
    }
  }

  isNotesExist(): boolean {
    return this.notes.length !== 0;
  }

  getNotesByReportId() {
    this._noteService.getNotesByReportId(this.reportId).subscribe(data => {
      this.notes = data;
      console.log(this.notes);
    });
  }
}
