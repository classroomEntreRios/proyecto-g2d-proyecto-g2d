import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
