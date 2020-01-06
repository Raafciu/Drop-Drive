import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropboxService} from '../../service/drop-box-service/dropbox.service';
import {DropboxAuth} from '../../model/dropboxAuth';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'drop-box-api',
  templateUrl: './drop-box-api.component.html',
  styleUrls: ['./drop-box-api.component.scss']
})
export class DropBoxApiComponent implements OnInit, OnDestroy {

  public dropboxAuth: DropboxAuth;
  private subscrption: Subscription;

  constructor(private _dropboxService: DropboxService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscrption = this._dropboxService.getAuth()
      .subscribe(auth => this.dropboxAuth = auth);

    this.getAuthIntoLocalStorage();
  }

  ngOnDestroy(): void {
    this.subscrption.unsubscribe();
  }

  signIn() {
    this._dropboxService.initClient();
  }

  isUserSignedIn(): boolean {
    return this._dropboxService.isSignedIn();
  }

  signOut() {
    this._dropboxService.clearAuth();
  }

  getAuthIntoLocalStorage() {
    if (!this.dropboxAuth.isAuth) {
      const authUrl = this.router.url;
      console.log(this.router.url);
      const parameters = authUrl.split('#')[1] || '';
      if (parameters.length > 0) {
        const arrParams = parameters.split('&') || [];
        if (arrParams.length > 0) {
          const authObj: DropboxAuth = {isAuth: false};
          for (let i = 0; i < arrParams.length; i++) {
            const arrItem = arrParams[i].split('=');
            switch (arrItem[0]) {
              case 'access_token':
                authObj.accessToken = arrItem[1];
                break;
              case 'token_type':
                authObj.tokenType = arrItem[1];
                break;
              case 'uid':
                authObj.uid = arrItem[1];
                break;
              case 'account_id':
                authObj.accountId = arrItem[1];
                break;
              default:
                break;
            }
          }

          if (authObj.accessToken && authObj.tokenType && authObj.uid && authObj.accountId) {
            authObj.isAuth = true;
            this.dropboxAuth = authObj;
          }

          console.log('authObj', authObj);
        }
      }

      // Store credentials into Auth-service and into localStorage
      if (this.dropboxAuth.isAuth) {
        this._dropboxService.storeAuth(this.dropboxAuth);
        this.router.navigate(['/drop-box']); // Navigate the user  after authorization
      }
    } else {
      this.router.navigate(['/drop-box']); // Navigate the user after authorization
    }
  }
}
