import {Injectable} from '@angular/core';

//TODO parametry do zmiany
const CLIENT_ID = '733757192795-19hiob2sv7vb1e91qg1hb776nu6n30ve.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDvvtUUm2Eyd2FcZXs1ZLQjmTSFm0LjD_A';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive';

@Injectable()
export class GapiSession {
  googleAuth: gapi.auth2.GoogleAuth;

  initClient(): Promise<any> {
    return new Promise(((resolve, reject) => {
      return gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        this.googleAuth = gapi.auth2.getAuthInstance();
        resolve();
      });
    }));
  }
}
