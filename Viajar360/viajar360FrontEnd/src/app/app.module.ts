import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule, ComponentesRouting } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselHomeComponent } from './components/carousel-home/carousel-home.component';
import { FooterHomeComponent } from './components/footer-home/footer-home.component';
import { GeneralNavComponent } from './components/general-nav/general-nav.component';
import { InfoHomeComponent } from './components/info-home/info-home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserFavsComponent } from './components/user-favs/user-favs.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistradoNavComponent } from './components/registrado-nav/registrado-nav.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { LogueadoComponent } from './components/logueado/logueado.component';

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
    ComponentesRouting,
    RegistradoNavComponent,
    PerfilUsuarioComponent,
    LogueadoComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
