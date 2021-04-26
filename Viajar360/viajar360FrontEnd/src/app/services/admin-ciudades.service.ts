import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


/*Rever todos los metodos para comodar las url de acuerdo al metodo del back que consulten*/


@Injectable({
  providedIn: 'root'
})
export class AdminCiudadesService {

  constructor(private http: HttpClient) { }

  // Traer ciudad desde el back

  getCiudad(id): Observable<any> {
    return this.http.get("https://localhost:44389/api/obtenerciudad/"+id);
  }

//Traer lista de ciudades

  getCiudades(): Observable<any> {
    return this.http.get("https://localhost:44389/api/listarciudades");
  }

  createCiudad(info:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/crearciudad", info);
  }

  actualizarCiudad(info:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/editarciudad", info);
  }

  deleteCiudad(datos:any): Observable<any>{
    return this.http.post("https://localhost:44389/api/borrarciudad",datos);
  }

}
