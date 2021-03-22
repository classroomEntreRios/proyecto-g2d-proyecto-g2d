<<<<<<< HEAD
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'user', component: UserDashboardComponent}
];
=======
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];
>>>>>>> 62734f8b2c9c9c05bf8d1f531ed11794c4f7f787

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD
  
=======
>>>>>>> 62734f8b2c9c9c05bf8d1f531ed11794c4f7f787
export class AppRoutingModule { }
