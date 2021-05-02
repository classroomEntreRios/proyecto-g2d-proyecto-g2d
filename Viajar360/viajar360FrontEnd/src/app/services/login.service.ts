import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { url } from 'node:inspector';

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

  getid(name: any): Observable<any>{
    return this.http.post('https://localhost:44389/api/obtenerid/', name);
  }

  getdata(id: string): Observable<any>{
    return this.http.get('https://localhost:44389/api/getdatos/'+id);
  }

  editarUser(datos: any): Observable<any>{
    return this.http.post('https://localhost:44389/api/editarusuario', datos);
  }
  //borrardo de cuentas
  getRemoveKey(datos: any): Observable<any>{
    return this.http.post('https://localhost:44389/api/getremovekey',datos);
  }
  
  borrarCuenta(datos: any): Observable<any>{
    return this.http.post('https://localhost:44389/api/borrarcuenta',datos);
  }
}
