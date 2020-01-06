import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DropBoxAuth} from '../../model/dropBoxAuth';
import {DropBoxService} from './dropBox.service';
import {Dropbox} from 'dropbox';
import {NotificationService} from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class DropBoxFileService {

  private dropBoxAuth: DropBoxAuth;
  private subscription: Subscription;

  stream;
  dropBoxConnection;
  deletedItems = [];

  constructor(private _dropBoxService: DropBoxService,
              private _notificationService: NotificationService) {
    this.subscription = this._dropBoxService.getAuth().subscribe(auth => {
      this.dropBoxAuth = auth;
      this.dropBoxConnection = new Dropbox({accessToken: this.dropBoxAuth.accessToken});
      this.getLoggedUserEmail();
    });

    this.stream = new BehaviorSubject([]);
  }

  getFiles(path) {
    console.log(decodeURI(path));
    if (path === '/') {
      path = '';
    }
    this.dropBoxConnection.filesListFolder({path: decodeURI(path)})
      .then(response => {
        const entries = response.entries;
        this.stream.next(entries);
      });
  }

  deleteFile(filePath: string) {
    this.dropBoxConnection.filesDeleteV2({path: decodeURI(filePath)}).then(response => {
      this._notificationService.success('usunieto plik: ' + response.metadata.path_lower.slice(1));
    });
  }

  createFolder(folderName: string) {
    let correctFolderName: string = '/' + folderName;
    this.dropBoxConnection.filesCreateFolderV2({path: correctFolderName, autorename: false}).then(response => {
      this._notificationService.success('Utworzono folder');
    });
  }

  getLoggedUserEmail() {
    console.log(this.dropBoxAuth.accountId);
    if(this.dropBoxAuth.accountId) {
      this.dropBoxConnection.usersGetAccount({account_id: this.dropBoxAuth.accountId}).then(response => {
        this.dropBoxAuth.email = response.email;
      });
    }
  }
}
