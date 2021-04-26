import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LogoffComponent } from './components/logoff/logoff.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { LogueadoComponent } from './components/logueado/logueado.component';
import {ChatComponent} from './chat/chat/chat.component';


const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'user', component: UserDashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'salida', component: LogoffComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'perfil', component: PerfilUsuarioComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'logueado', component: LogueadoComponent},
  { path: 'chat', component: ChatComponent},
  { path: '', redirectTo: 'home',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const ComponentesRouting = [LoginComponent,LogoffComponent,RegistroComponent,PerfilUsuarioComponent,LogueadoComponent,ChatComponent];
