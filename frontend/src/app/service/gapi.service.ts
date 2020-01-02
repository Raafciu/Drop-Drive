import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../model/user';

//TODO parametry do zmiany
const CLIENT_ID = '733757192795-19hiob2sv7vb1e91qg1hb776nu6n30ve.apps.googleusercontent.com';
export const API_KEY = 'AIzaSyDvvtUUm2Eyd2FcZXs1ZLQjmTSFm0LjD_A';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive';

@Injectable()
export class GapiService {
  googleAuth: gapi.auth2.GoogleAuth;

  constructor(private userService: UserService) {
  }

  initClient(): Promise<any> {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        return gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(() => {
          this.googleAuth = gapi.auth2.getAuthInstance();
          resolve();
        });
      });
    });
  }

  signIn() {
    return this.googleAuth.signIn({
      prompt: 'consent'
    }).then((googleUser: gapi.auth2.GoogleUser) => {
      this.userService.addUser(googleUser.getBasicProfile());
    });
  }

  signOut(): void {
    this.googleAuth.signOut();
  }

  getUser(): User {
    return this.userService.getUser();
  }

  get isSignedIn(): boolean {
    return this.googleAuth.isSignedIn.get();
  }
}
