import {Component, NgZone, OnInit} from '@angular/core';
import {GapiService} from '../../service/google-drive-service/gapi.service';
import {MatBottomSheet, MatDialog, MatTableDataSource} from '@angular/material';
import {FileInfo, MIME_TYPE_FOLDER} from '../../model/fileInfo';
import {FileService} from '../../service/google-drive-service/file.service';
import {User} from '../../model/user';
import {NotificationService} from '../../service/notification.service';
import * as FileSaver from 'file-saver';
import {BreadCrumbItem} from '../../model/breadCrumbItem';
import {BreadcrumbService} from '../../service/breadcrumb.service';
import {BreadCrumbItemOption, OPTION_NEW_FOLDER} from '../../model/breadCrumbItemOption';
import {DialogInputData} from '../../model/dialogInputData';
import {DialogInputComponent} from '../dialog-input/dialog-input.component';
import {UploadFilesComponent} from '../upload-files/upload-files.component';

const ROOT_FOLDER = 'root';

@Component({
  selector: 'google-drive-api',
  templateUrl: './google-drive-api.component.html',
  styleUrls: ['./google-drive-api.component.scss']
})
export class GoogleDriveApiComponent implements OnInit {

  breadCrumbItems: BreadCrumbItem[] = [];
  dataSource: MatTableDataSource<FileInfo>;
  displayedColumns: string[] = ['icon', 'name', 'modifiedTime', 'size', 'delete', 'download'];
  files: FileInfo[] = [];
  loggedUser: User;

  constructor(private _gapiService: GapiService,
              private _fileService: FileService,
              private ngZone: NgZone,
              private _notificationService: NotificationService,
              private _breadcrumbService: BreadcrumbService,
              private dialog: MatDialog,
              private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {

    if (this.isSignedIn()) {
      const user: User = this._gapiService.getUser();
      if (user) {
        this.loggedUser = user;
      }
      this._breadcrumbService.init();
      this.breadCrumbItems = this._breadcrumbService.items;
      this.refreshFilesForFolder(ROOT_FOLDER);
    }
  }

  signIn() {
    this._gapiService.signIn()
      .then(() => {
        if (this.isSignedIn()) {
          console.log('Zalogowany');
          this.refreshFilesForFolder(ROOT_FOLDER);
          window.location.reload();
        }
      });
  }

  signOut() {
    this._gapiService.signOut();
    window.location.reload();
  }

  isSignedIn(): boolean {
    return this._gapiService.isSignedIn;
  }

  refreshFilesForFolder(folderId: string) {
    this._fileService.getFiles(folderId).then(response => {
      this.ngZone.run(() => {
        this.files = response;
        console.log(this.files);
        this.dataSource = new MatTableDataSource(this.files);
      });
    });
  }

  isFolder(fileInfo: FileInfo): boolean {
    return fileInfo.isFolder;
  }

  deleteFile(file: FileInfo) {
    this.files.splice(this.files.indexOf(file), 1);
    this._fileService.deleteFile(file.id).then(() => {
      this.ngZone.run(() => {
        this.dataSource.data = this.files;
        this._notificationService.success('Usunięto');
      });
    });
  }

  downloadFile(file: FileInfo) {
    //TODO nie działa dalej.
    this._fileService.getBlobFile(file).then(response => {
      console.log(response);
      let blob: Blob = new Blob([response.body], {type: 'mimeType'});
      console.log(blob);
      FileSaver.saveAs(blob, file.name);
    });
  }

  private navigateTo(file: FileInfo) {
    if (file.isFolder) {
      this._fileService.getFiles(file.id).then(response => {
        this.ngZone.run(() => {
          this.files = response;
          this.dataSource.data = this.files;
          this._breadcrumbService.navigateTo(file.id, file.name);
          this.breadCrumbItems = this._breadcrumbService.items;
        });
      });
    }
  }

  onSelectedItemChanged($event: BreadCrumbItem) {
    let fileInfo: FileInfo = new FileInfo();
    fileInfo.id = $event.id;
    fileInfo.name = $event.name;
    fileInfo.mimeType = MIME_TYPE_FOLDER;
    this.navigateTo(fileInfo);
  }

  onSelectedOptionChanged($event: BreadCrumbItemOption) {
    if ($event.option === OPTION_NEW_FOLDER) {
      this.createNewFolder();
    } else {
      this.bottomSheet.open(UploadFilesComponent, {data: $event.data});
      this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(() => {
        this.refreshFilesForFolder(this._breadcrumbService.currentItem.id);
      });
    }
  }

  private createNewFolder() {
    let data: DialogInputData = new DialogInputData();
    data.inputTitle = 'Tworzenie nowego folderu';
    const dialogRef = this.dialog.open(DialogInputComponent, {
      height: '250px',
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._fileService.createFile(this._breadcrumbService.currentItem.id, result).then(() => {
          this.refreshFilesForFolder(this._breadcrumbService.currentItem.id);
        });
      }
    });
  }
}
