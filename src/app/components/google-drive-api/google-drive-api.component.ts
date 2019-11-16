import {Component} from "@angular/core";
import {GapiSession} from '../../service/infrastucture/sessions/gapi.session';

@Component({
  selector: 'google-drive-api',
  templateUrl: './google-drive-api.component.html',
  styleUrls: ['./google-drive-api.component.scss']
})
export class GoogleDriveApiComponent {

  constructor(private gapiSession: GapiSession){
  }

  signIn() {
    this.gapiSession.signIn()
      .then(() => {
        if(this.gapiSession.isSignedIn) {
          console.log('Zalogowany');
        }
      });
  }
}
