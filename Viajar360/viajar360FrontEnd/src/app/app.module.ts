import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { GeneralNavComponent } from './general-nav/general-nav.component';
import { InfoHomeComponent } from './info-home/info-home.component';
import { InicioComponent } from './inicio/inicio.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserFavsComponent } from './user-favs/user-favs.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    CarouselHomeComponent,
    FooterHomeComponent,
    GeneralNavComponent,
    InfoHomeComponent,
    InicioComponent,
    UserDashboardComponent,
    UserFavsComponent,
    UserInfoComponent,
    UserNavComponent,
    RegistroComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
         
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
