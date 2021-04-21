import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  testToken = {
    usuario: '',
    sid: ''
  }
  salida = false;
  constructor(private http: HttpClient, private cookie: CookieService) { }
  login(user: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/ingreso", user);
  }

  register(info:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/registro", info);
  }

  SetToken(Token: string, Nus: string) {
    this.cookie.set("token",Token);
    this.cookie.set("usuario",Nus);
  }
  GetToken() {
    this.testToken.usuario = this.cookie.get('usuario');
    this.testToken.sid = this.cookie.get('token');
    return this.testToken
  }
  ConnectToken(): Observable<any>{
    this.testToken.usuario = this.cookie.get('usuario');
    this.testToken.sid = this.cookie.get('token');
    return this.http.post('https://localhost:44389/api/token',this.testToken);
  }
  LogOut(){
    this.cookie.delete('token');
    this.cookie.delete('usuario');
  }
}
