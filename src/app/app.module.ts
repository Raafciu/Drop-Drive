import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {GoogleDriveApiComponent} from './components/google-drive-api/google-drive-api.component';
import {GapiSession} from './service/infrastucture/sessions/gapi.session';
import {MainMenuComponent} from './components/main-menu/main-menu.component';

export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

@NgModule({
  declarations: [
    AppComponent,
    GoogleDriveApiComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    //TODO narazie coś nie działa inicjalizacja klienta
    // {provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSession], multi: true},
    GapiSession
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
