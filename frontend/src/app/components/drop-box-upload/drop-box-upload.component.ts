import {Component, OnInit} from '@angular/core';
import {DropBoxAuth} from '../../model/dropBoxAuth';
import {DropBoxService} from '../../service/drop-box-service/dropBox.service';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {DropBoxFileService} from '../../service/drop-box-service/dropBoxFile.service';
import {NotificationService} from '../../service/notification.service';
import {UrlMethods} from '../../utils/dropboxUtil';

@Component({
  selector: 'app-drop-box-upload',
  templateUrl: './drop-box-upload.component.html',
  styleUrls: ['./drop-box-upload.component.scss']
})
export class DropBoxUploadComponent implements OnInit {

  private dropBoxAuth: DropBoxAuth;
  private subscription: Subscription;

  files;
  filename = {name: ''};

  constructor(private _dropBoxService: DropBoxService,
              private http: HttpClient,
              private router: Router,
              private _dropBoxFileService: DropBoxFileService,
              private _notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.subscription = this._dropBoxService.getAuth().subscribe(auth => this.dropBoxAuth = auth);
    if (!this.dropBoxAuth.isAuth) {
      this.router.navigate(['/drop-box']);
    }
  }

  storeFiles(files) {
    this.files = files;
    this.upload();
  }

  private upload() {
    const pathWithPrefix = UrlMethods.decodeWithoutParams(this.router.url);
    const filePath = UrlMethods.removePrefixFromUrl(pathWithPrefix);
    console.log(this.filename.name);
    const name = this.filename.name.split('\\').pop();
    const arg = {
      path: filePath + '/' + name,
      mode: 'add',
      autorename: true,
      mute: false
    };

    let httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.dropBoxAuth.accessToken,
        'Dropbox-API-Arg': JSON.stringify(arg),
        'Content-Type': 'application/octet-stream'
      })
    };

    const send = this.http.post('https://content.dropboxapi.com/2/files/upload', this.files.item(0), httpOptions);
    send.subscribe((results: any) => {
        this._dropBoxFileService.getFiles(filePath);
        this._notificationService.success('Import zakończony pomyślnie');
      },
      error => {
        console.error('error', error);
      });
    return send;
  }
}
