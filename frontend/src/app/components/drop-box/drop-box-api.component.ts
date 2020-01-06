import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropBoxService} from '../../service/drop-box-service/dropBox.service';
import {DropBoxAuth} from '../../model/dropBoxAuth';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Dropbox} from 'dropbox';
import {UrlMethods} from '../../utils/dropboxUtil';
import {DropBoxFileService} from '../../service/drop-box-service/dropBoxFile.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {FormatterUtil} from '../../utils/formatterUtil';
import {DialogInputData} from '../../model/dialogInputData';
import {DialogInputComponent} from '../dialog-input/dialog-input.component';

const ROOT_FOLDER = '/';

@Component({
  selector: 'drop-box-api',
  templateUrl: './drop-box-api.component.html',
  styleUrls: ['./drop-box-api.component.scss']
})
export class DropBoxApiComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['icon', 'name', 'modifiedTime', 'size', 'delete', 'download'];


  public storageSpace;
  public usedSpace;
  public spacePercentage;

  public dropboxAuth: DropBoxAuth;
  private subscrption: Subscription;

  private currentUrl = '';

  private dropboxConnection;

  private fileStreamSubscription: Subscription;

  private compEntries: Array<any> = [];

  constructor(private _dropBoxService: DropBoxService,
              private _dropBoxFileService: DropBoxFileService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscrption = this._dropBoxService.getAuth()
      .subscribe(auth => this.dropboxAuth = auth);

    this.getAuthIntoLocalStorage();

    if (this.dropboxAuth.isAuth) {

      this.dropboxConnection = new Dropbox({accessToken: this.dropboxAuth.accessToken});
      this.updateFiles();
    }
  }


  signIn() {
    this._dropBoxService.initClient();
  }

  isUserSignedIn(): boolean {
    return this._dropBoxService.isSignedIn();
  }

  signOut() {
    this._dropBoxService.clearAuth();
    window.location.reload();
  }

  getAuthIntoLocalStorage() {
    if (!this.dropboxAuth.isAuth) {
      const authUrl = this.router.url;
      console.log(this.router.url);
      const parameters = authUrl.split('#')[1] || '';
      if (parameters.length > 0) {
        const arrParams = parameters.split('&') || [];
        if (arrParams.length > 0) {
          const authObj: DropBoxAuth = {isAuth: false};
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
        this._dropBoxService.storeAuth(this.dropboxAuth);
        this.router.navigate(['/drop-box']); // Navigate the user  after authorization
      }
    } else {
      this.router.navigate(['/drop-box']); // Navigate the user after authorization
    }
  }

  private updateFileStream(inData: Array<any>) {
    this.compEntries = inData;
    this.getData();
    if (this.dataSource === undefined) {
      this.dataSource = new MatTableDataSource(this.compEntries);
    } else {
      this.dataSource.data = this.compEntries;
    }
    console.log(this.compEntries);
  }

  getData() {
    this.dropboxConnection.usersGetSpaceUsage(null).then(spaceInfo => {
      console.log(spaceInfo);
      this.storageSpace = (spaceInfo.allocation.allocated / 1024 / 1024 / 1024).toFixed(2);
      this.usedSpace = (spaceInfo.used / 1024 / 1024 / 1024).toFixed(2);
      this.spacePercentage = (this.usedSpace / this.storageSpace) * 100;
      console.log(this.spacePercentage);
    }).catch(error => {
      console.log(error);
    });
  }

  downloadFile(filePath, fileName, event) {
    event.preventDefault();
    console.log(filePath);
    this.dropboxConnection.filesDownload({path: filePath}).then(data => {
      console.log(data);
      const fileUrl = URL.createObjectURL((<any> data).fileBlob);
      const a = document.createElement('a');
      if (this.isImage(data.path_lower)) {
        console.log('this is image');
      }
      a.setAttribute('href', fileUrl);
      a.setAttribute('download', fileName);
      a.click();
    }).catch(error => console.log(error));
  }

  sizeFormat(size) {
    return FormatterUtil.sizeFormat(size);
  }

  isFolder(item): boolean {
    return item['.tag'] === 'folder';
  }

  deleteFile(filePath, event) {
    event.preventDefault();
    this._dropBoxFileService.deleteFile(filePath);
    this.currentUrl = UrlMethods.decodeWithoutParams(this.router.url);
    this._dropBoxFileService.getFiles(ROOT_FOLDER); //TODO narazie cały czas z root foldera, przydałoby się zaorać dla każdego folderu
  }

  isImage(fileName: string) {
    if (fileName !== '' && fileName.length > 4) {
      const supportedImages = ['jpg', 'jpeg', 'png', 'tiff', 'tif', 'gif', 'bmp'];
      const fileEnding = fileName.split('.').pop();
      if (supportedImages.some(imgType => imgType === fileEnding)) {
        return true;
      }
    }
    return false;
  }

  updateFiles() {
    this.activatedRoute.url.subscribe(() => {
      this.currentUrl = UrlMethods.decodeWithoutParams(this.router.url);
      this._dropBoxFileService.getFiles(ROOT_FOLDER); //TODO narazie cały czas z root foldera, przydałoby się zaorać dla każdego folderu
      console.log('Current URL ', this.currentUrl);
    });
    this.fileStreamSubscription = this._dropBoxFileService.stream.subscribe(entries => {
      this.updateFileStream(entries);
    });
  }

  createNewFolder() {
    let data: DialogInputData = new DialogInputData();
    data.inputTitle = 'Tworzenie nowego folderu';
    const dialogRef = this.dialog.open(DialogInputComponent, {
      height: '250px',
      width: '500px',
      data: data,
      restoreFocus: false
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._dropBoxFileService.createFolder(result);
        this.currentUrl = UrlMethods.decodeWithoutParams(this.router.url);
        this._dropBoxFileService.getFiles(ROOT_FOLDER); //TODO narazie cały czas z root foldera, przydałoby się zaorać dla każdego folderu
      }
    });
  }

  ngOnDestroy(): void {
    this.subscrption.unsubscribe();
    this.fileStreamSubscription.unsubscribe();
  }
}
