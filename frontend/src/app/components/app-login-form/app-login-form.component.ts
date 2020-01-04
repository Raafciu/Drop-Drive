import {Component, NgZone} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CompanyService} from '../../service/company-service/company.service';
import {Router} from '@angular/router';
import {CompanyUser} from '../../model/company/companyUser';
import {CompanyAppService} from '../../service/company-service/companyApp.service';
import {NotificationService} from '../../service/notification.service';
import {sha512} from 'js-sha512';

@Component({
  selector: 'app-login-form',
  templateUrl: './app-login-form.component.html',
  styleUrls: ['./app-login-form.component.scss']
})
export class AppLoginFormComponent {

  users: CompanyUser[];
  form: FormGroup;
  usernameFC: FormControl;
  passwordFC: FormControl;

  constructor(private _companyService: CompanyService,
              private _companyAppService: CompanyAppService,
              private router: Router,
              private _notificationService: NotificationService,
              private ngZone: NgZone) {
    this.getUsersFromDB();

    this.usernameFC = new FormControl('');
    this.passwordFC = new FormControl('');

    this.form = new FormGroup({
      usernameFC: this.usernameFC,
      passwordFC: this.passwordFC
    });
  }

  submit() {
    if (this.form.valid && this.usernameFC.value && this.passwordFC.value) {
      const passwordHash = sha512(this.passwordFC.value);
      let isCorrect: boolean = false;
      console.log(this.users);
      this.users.forEach(user => {
        if (user.username === this.usernameFC.value && user.password === passwordHash) {
          console.log('zalogowany  ' + user.username);
          this._companyAppService.saveUser(user);
          isCorrect = true;
          window.location.reload();
        }
      });
      if (!isCorrect) {
        this._notificationService.error('Nieprawidłowy login lub hasło!');
      }
    } else {
      this._notificationService.error('Wypełnij wszystkie pola');
    }
  }

  getUsersFromDB() {
    this._companyService.findAll().subscribe(data => {
      this.ngZone.run(() => {
        console.log(data);
        this.users = data;
      });
    });
  }
}
