import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GoogleDriveApiComponent} from './components/google-drive-api/google-drive-api.component';
import {DropBoxApiComponent} from './components/drop-box/drop-box-api.component';
import {CompanyComponent} from './components/company/company.component';
import {HomeComponent} from './components/home/home.component';
import {AppRegisterFormComponent} from './components/app-register-form/app-register-form.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'google-drive', component: GoogleDriveApiComponent},
  {path: 'drop-box', component: DropBoxApiComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'app-register-form', component: AppRegisterFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
