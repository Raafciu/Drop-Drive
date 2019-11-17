import {Component, NgZone, OnInit} from '@angular/core';
import {GapiService} from '../../service/gapi.service';
import {MatTableDataSource} from '@angular/material';
import {FileInfo} from '../../model/fileInfo';
import {FileService} from '../../service/file.service';
import {User} from '../../model/user';
import {NotificationService} from '../../service/notification.service';

const ROOT_FOLDER = 'root';

@Component({
  selector: 'google-drive-api',
  templateUrl: './google-drive-api.component.html',
  styleUrls: ['./google-drive-api.component.scss']
})
export class GoogleDriveApiComponent implements OnInit {

  dataSource: MatTableDataSource<FileInfo>;
  displayedColumns: string[] = ['icon', 'name', 'modifiedTime', 'size', 'delete', 'download'];
  files: FileInfo[] = [];
  loggedUser: User;

  constructor(private _gapiService: GapiService,
              private _fileService: FileService,
              private ngZone: NgZone,
              private _notificationService: NotificationService) {
  }

  ngOnInit(): void {

    if (this.isSignedIn()) {
      const user: User = this._gapiService.getUser();
      if (user) {
        this.loggedUser = user;
      }
      this.refreshFilesForFolder(ROOT_FOLDER);
    }
  }

  signIn() {
    this._gapiService.signIn()
      .then(() => {
        if (this.isSignedIn()) {
          console.log('Zalogowany');
          this.refreshFilesForFolder(ROOT_FOLDER);
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
    return fileInfo.IsFolder;
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
    //TODO zrobić w przyszłości
  }
}
