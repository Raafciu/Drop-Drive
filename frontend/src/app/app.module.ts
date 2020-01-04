import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {GoogleDriveApiComponent} from './components/google-drive-api/google-drive-api.component';
import {GapiService} from './service/google-drive-service/gapi.service';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {CompanyComponent} from './components/company/company.component';
import {DropBoxApiComponent} from './components/drop-box/drop-box-api.component';
import {HomeComponent} from './components/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserService} from './service/google-drive-service/user.service';
import {FileService} from './service/google-drive-service/file.service';
import {NotificationService} from './service/notification.service';
import {HttpClientModule} from '@angular/common/http';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {BreadcrumbitemComponent} from './components/breadcrumbitem/breadcrumbitem.component';
import {BreadcrumbService} from './service/breadcrumb.service';
import {DialogInputComponent} from './components/dialog-input/dialog-input.component';
import {FormsModule} from '@angular/forms';
import {UploadFilesComponent} from './components/upload-files/upload-files.component';
import {DropboxService} from './service/drop-box-service/dropbox.service';

export function initGapi(gapiService: GapiService) {
  return () => gapiService.initClient();
}

@NgModule({
  declarations: [
    AppComponent,
    GoogleDriveApiComponent,
    MainMenuComponent,
    CompanyComponent,
    DropBoxApiComponent,
    HomeComponent,
    BreadcrumbComponent,
    BreadcrumbitemComponent,
    DialogInputComponent,
    UploadFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiService], multi: true},
    GapiService,
    UserService,
    FileService,
    NotificationService,
    BreadcrumbService,
    DropboxService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogInputComponent,
    UploadFilesComponent
  ]
})
export class AppModule {
}
