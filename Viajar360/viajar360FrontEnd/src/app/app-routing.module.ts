import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LogoffComponent } from './components/logoff/logoff.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RedirectdummyComponent } from './components/redirectdummy/redirectdummy.component';
import { TemasComponent } from './components/foro/temas/temas.component';
import { CreartemaComponent } from './components/foro/creartema/creartema.component';
import { HiloComponent } from './components/foro/hilo/hilo.component';
import { ChatComponent } from './components/chat/chat.component';
import { BorrarCuentaComponent } from './components/borrar-cuenta/borrar-cuenta.component';
import { VerPerfilComponent } from './components/ver-perfil/ver-perfil.component';
import { VistaUsuarioComponent } from './components/ciudades/vista-usuario/vista-usuario.component';
import { VerUsuarioComponent } from './components/atracciones/ver-usuario/ver-usuario.component';


const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'user', component: UserDashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'salida', component: LogoffComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'perfil', component: PerfilUsuarioComponent},
  { path: 'admin-dashboard/:dir/:info', component: AdminDashboardComponent },
  { path: 'admin-dashboard/:dir', component: AdminDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'dummy/:id', component: RedirectdummyComponent},
  { path: 'foro', component: TemasComponent},
  { path: 'foro/crear', component: CreartemaComponent},
  { path: 'foro/tema/:id', component: HiloComponent},
  { path: 'foro/tema', component: TemasComponent},
  { path: 'chat', component: ChatComponent },
  { path: 'BorrarCuenta', component: BorrarCuentaComponent},
  { path: 'verperfil/:id', component: VerPerfilComponent},
  { path: 'ciudades', component: VistaUsuarioComponent},
  { path: 'atracciones', component: VerUsuarioComponent},
  { path: '', redirectTo: 'home',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const ComponentesRouting = [LoginComponent,LogoffComponent,RegistroComponent,PerfilUsuarioComponent,TemasComponent,CreartemaComponent,ChatComponent,BorrarCuentaComponent,VerPerfilComponent,VistaUsuarioComponent,VerUsuarioComponent,HiloComponent];
