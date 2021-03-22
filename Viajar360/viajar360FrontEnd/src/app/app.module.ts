import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

<<<<<<< HEAD
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
    UserNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
=======
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
>>>>>>> 62734f8b2c9c9c05bf8d1f531ed11794c4f7f787
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
