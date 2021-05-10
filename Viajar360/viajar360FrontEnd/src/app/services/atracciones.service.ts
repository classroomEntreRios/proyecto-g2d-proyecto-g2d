import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtraccionesService {

  constructor(private http: HttpClient) { }
  obtenerAtracciones(id:string) : Observable<any>{
    return this.http.get("https://viajar360.azurewebsites.net/api/obteneratracciones/"+id);
  }
  
  ciudadAtracciones(id:string) : Observable<any>{
    return this.http.get("https://viajar360.azurewebsites.net/api/ciudadatracciones/"+id);
  }
  listarAtracciones(): Observable<any>{
    return this.http.get("https://viajar360.azurewebsites.net/api/listaratracciones");
  }

  editarAtraccion(entrada: any) : Observable<any>{
    return this.http.post("https://viajar360.azurewebsites.net/api/editaratraccion",entrada);
  }

  borrarAtraccion(entrada: any) : Observable<any>{
    return this.http.post("https://viajar360.azurewebsites.net/api/borraratraccion",entrada);
  }

  crearAtraccion(entrada: any) : Observable<any>{
    return this.http.post("https://viajar360.azurewebsites.net/api/crearatraccion",entrada);
  }
}
