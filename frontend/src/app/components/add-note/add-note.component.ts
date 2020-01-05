import {Component, Input, OnInit} from '@angular/core';
import {CompanyUser} from '../../model/company/companyUser';
import {NotificationService} from '../../service/notification.service';
import {Note} from '../../model/company/note';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  @Input() notes: Set<Note>;
  @Input() loggedUser: CompanyUser;

  form: FormGroup;
  descriptionFC: FormControl;

  constructor(private _notificationService: NotificationService) {

    this.descriptionFC = new FormControl('');

    this.form = new FormGroup({
      descriptionFC: this.descriptionFC
    });
  }

  ngOnInit(): void {
    console.log(this.loggedUser);
  }

  addNote() {
    if (this.form.valid && this.descriptionFC.value) {

    } else {
      this._notificationService.error('Podaj treść notatki');
    }
  }

  isNotesExist(): boolean {
    return this.notes.size !== 0;
  }
}
