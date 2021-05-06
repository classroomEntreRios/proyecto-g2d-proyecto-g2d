import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtraccionesService {

  constructor(private http: HttpClient) { }
  obtenerAtracciones(id:string) : Observable<any>{
    return this.http.get("https://localhost:44389/api/obteneratracciones/"+id);
  }

  listarAtracciones(): Observable<any>{
    return this.http.get("https://localhost:44389/api/listaratracciones");
  }

  editarAtraccion(entrada: any) : Observable<any>{
    return this.http.post("https://localhost:44389/api/editaratraccion",entrada);
  }

  borrarAtraccion(entrada: any) : Observable<any>{
    return this.http.post("https://localhost:44389/api/borraratraccion",entrada);
  }

  crearAtraccion(entrada: any) : Observable<any>{
    return this.http.post("https://localhost:44389/api/crearatraccion",entrada);
  }
}
