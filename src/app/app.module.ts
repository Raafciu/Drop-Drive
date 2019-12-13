import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {GoogleDriveApiComponent} from './components/google-drive-api/google-drive-api.component';
import {GapiService} from './service/gapi.service';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {CompanyComponent} from './components/company/company.component';
import {DropBoxApiComponent} from './components/drop-box/drop-box-api.component';
import {HomeComponent} from './components/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserService} from './service/user.service';
import {FileService} from './service/file.service';
import {NotificationService} from './service/notification.service';
import {HttpClientModule} from '@angular/common/http';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {BreadcrumbitemComponent} from './components/breadcrumbitem/breadcrumbitem.component';
import {BreadcrumbService} from './service/breadcrumb.service';

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
    BreadcrumbitemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiService], multi: true},
    GapiService,
    UserService,
    FileService,
    NotificationService,
    BreadcrumbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
