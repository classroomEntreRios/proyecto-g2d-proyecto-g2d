
import { InicioComponent } from './components/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LogoffComponent } from './components/logoff/logoff.component';


const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'user', component: UserDashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'salida', component: LogoffComponent},
  { path: '', redirectTo: 'home',pathMatch: 'full'}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
  
export class AppRoutingModule { }
export const ComponentesRouting = [LoginComponent,LogoffComponent];
