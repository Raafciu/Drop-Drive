import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {DropboxAuth} from '../../model/dropboxAuth';

const CLIENT_ID = 'w6z7dyorg7kv70d';
const REDIRECT_URI = 'http://localhost:4200/drop-box';
const RESPONSE_TYPE = 'token';
const TRUST_URL = 'https://www.dropbox.com';

const DROPBOX_USERS = 'dropBoxUsers';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  private dropboxAuth: DropboxAuth = {isAuth: false};
  private objBehaviorSubject: BehaviorSubject<any>;

  constructor(private router: Router) {
    this.objBehaviorSubject = new BehaviorSubject(this.dropboxAuth);

    const savedCredentials: DropboxAuth = this.getItem(DROPBOX_USERS);
    if (savedCredentials) {
      this.storeAuth(savedCredentials);
    }
  }

  initClient() {
    const urlAuth = 'https://www.dropbox.com/oauth2/authorize?'
      + `client_id=${CLIENT_ID}`
      // + `&redirect_uri=${REDIRECT_URI}`
      + `&response_type=${RESPONSE_TYPE}`;
    console.log(urlAuth);
    window.location.href = urlAuth;
  }

  getAuth(): BehaviorSubject<DropboxAuth> {
    return this.objBehaviorSubject;
  }

  storeAuth(inDropboxAuth: DropboxAuth) {
    this.dropboxAuth = inDropboxAuth;
    this.setItem(DROPBOX_USERS, this.dropboxAuth);
    return this.objBehaviorSubject.next(this.dropboxAuth);
  }

  clearAuth() {
    this.dropboxAuth = {};
    this.clear();
    return this.objBehaviorSubject.next(this.dropboxAuth);
  }

  getItem(key: string) {
    try {
      if (typeof (Storage) !== 'undefined') {
        if (localStorage.getItem(key)) {
          return JSON.parse(localStorage.getItem(key));
        } else {
          return null;
        }
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  }

  setItem(key, value) {
    try {
      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  }

  clear() {
    try {
      if (typeof (Storage) !== 'undefined') {
        localStorage.clear();
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  }
}
