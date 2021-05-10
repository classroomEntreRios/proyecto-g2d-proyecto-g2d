import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private http: HttpClient) { }
  getTemas(): Observable<any> {
    return this.http.get("https://viajar360.azurewebsites.net/api/temas");
  }

  crearTema(tema: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/creartemas", tema);
  }
  
  getComentarios(id: string): Observable<any> {
    return this.http.get("https://viajar360.azurewebsites.net/api/listarcomentarios/"+id);
  }

  Comentar(envio: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/crearcomentario", envio);
  }

  BorrarComentario(envio: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/borrarcomentario",envio);
  }

  perdonarComentario(envio: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/perdonarcomentario",envio);
  }

  BorrarTema(envio: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/borrarhilo",envio)
  }

  CerrarTema(envio: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/cerrarhilo",envio);
  }

  AbrirTema(envio: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/reabrirhilo",envio);
  }

  reportarComentario(envio: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/reportarcomentario", envio);
  }

  listarReportados(): Observable<any> {
    return this.http.get("https://viajar360.azurewebsites.net/api/lscomreport");
  }

  obtenerUserid(envio: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/getuid",envio);
  }

}
