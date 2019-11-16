import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {GoogleDriveApiComponent} from './components/google-drive-api/google-drive-api.component';
import {GapiSession} from './service/infrastucture/sessions/gapi.session';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {CompanyComponent} from './components/company/company.component';
import {DropBoxApiComponent} from './components/drop-box/drop-box-api.component';
import {HomeComponent} from './components/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserService} from './service/user.service';

export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

@NgModule({
  declarations: [
    AppComponent,
    GoogleDriveApiComponent,
    MainMenuComponent,
    CompanyComponent,
    DropBoxApiComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    //TODO narazie coś nie działa inicjalizacja klienta
    {provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSession], multi: true},
    GapiSession,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
