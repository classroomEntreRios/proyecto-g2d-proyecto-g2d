import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private http: HttpClient) { }
  getTemas(): Observable<any> {
    return this.http.get("https://localhost:44389/api/temas");
  }

  crearTema(tema: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/creartemas", tema);
  }
  
  getComentarios(id: string): Observable<any> {
    return this.http.get("https://localhost:44389/api/listarcomentarios/"+id);
  }

  Comentar(envio: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/crearcomentario", envio);
  }

  BorrarComentario(envio: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/borrarcomentario",envio);
  }

  perdonarComentario(envio: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/perdonarcomentario",envio);
  }

  BorrarTema(envio: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/borrarhilo",envio)
  }

  CerrarTema(envio: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/cerrarhilo",envio);
  }

  AbrirTema(envio: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/reabrirhilo",envio);
  }

  reportarComentario(envio: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/reportarcomentario", envio);
  }

  listarReportados(): Observable<any> {
    return this.http.get("https://localhost:44389/api/lscomreport");
  }

  obtenerUserid(envio: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/getuid",envio);
  }

}
