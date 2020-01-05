import {Component, NgZone} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../../service/notification.service';
import {Router} from '@angular/router';
import {CompanyUser} from '../../model/company/companyUser';
import {sha512} from 'js-sha512';
import {CompanyService} from '../../service/company-service/company.service';
import {CompanyAppService} from '../../service/company-service/companyApp.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './app-register-form.component.html',
  styleUrls: ['./app-register-form.component.scss']
})
export class AppRegisterFormComponent {

  users: CompanyUser[];

  form: FormGroup;

  firstNameFC: FormControl;
  lastNameFC: FormControl;
  usernameFC: FormControl;
  passwordFC: FormControl;
  repeatPasswordFC: FormControl;
  emailFC: FormControl;
  phoneFC: FormControl;
  companyNameFC: FormControl;

  constructor(private _notificationService: NotificationService,
              private router: Router,
              private _companyService: CompanyService,
              private _companyAppService: CompanyAppService,
              private ngZone: NgZone) {

    this.getUsersFromDB();

    this.firstNameFC = new FormControl('');
    this.lastNameFC = new FormControl('');
    this.usernameFC = new FormControl('');
    this.passwordFC = new FormControl('');
    this.repeatPasswordFC = new FormControl('');
    this.emailFC = new FormControl('');
    this.phoneFC = new FormControl('');
    this.companyNameFC = new FormControl('');

    this.form = new FormGroup({
      firstNameFC: this.firstNameFC,
      lastNameFC: this.lastNameFC,
      usernameFC: this.usernameFC,
      passwordFC: this.passwordFC,
      repeatPasswordFC: this.repeatPasswordFC,
      emailFC: this.emailFC,
      phoneFC: this.phoneFC,
      companyNameFC: this.companyNameFC
    });
  }

  submit() {
    if (this.isAllFieldsFilled()) {
      if (this.passwordFC.value === this.repeatPasswordFC.value) {
        let isLoggedExist: boolean = false;
        this.users.forEach(user => {
          if (user.username === this.usernameFC.value) {
            isLoggedExist = true;
          }
        });
        if (!isLoggedExist) {
          let user: CompanyUser = new CompanyUser();
          user.firstName = this.firstNameFC.value;
          user.lastName = this.lastNameFC.value;
          user.username = this.usernameFC.value;
          user.password = sha512(this.passwordFC.value);
          user.email = this.emailFC.value;
          user.phone = this.phoneFC.value;
          user.companyName = this.companyNameFC.value;

          this._companyService.save(user).subscribe(() => {
            this.router.navigateByUrl('/company');
            this._notificationService.success('Dziękujemy za rejestracje. Teraz możesz się zalogować');
          }, error => this._notificationService.error('Wystąpił błąd, prosimy spróbować ponownie później'));
        } else {
          this._notificationService.error('Podany login istnieje w bazie danych');
        }
      } else {
        this._notificationService.error('Hasła nie są takie same');
      }
    } else {
      this._notificationService.error('Wypełnij wszystkie pola');
    }
  }

  isAllFieldsFilled() {
    return this.form.valid
      && this.firstNameFC.value
      && this.lastNameFC.value
      && this.usernameFC.value
      && this.passwordFC.value
      && this.repeatPasswordFC.value
      && this.emailFC.value
      && this.phoneFC.value
      && this.companyNameFC.value;
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
