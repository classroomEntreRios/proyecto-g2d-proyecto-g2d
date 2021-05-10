import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


/*Rever todos los metodos para comodar las url de acuerdo al metodo del back que consulten*/


@Injectable({
  providedIn: 'root'
})
export class AdminCiudadesService {

  constructor(private http: HttpClient) { }

  // Traer ciudad desde el back

  getCiudad(id): Observable<any> {
    return this.http.get("https://viajar360.azurewebsites.net/api/obtenerciudad/"+id);
  }

//Traer lista de ciudades

  getCiudades(): Observable<any> {
    return this.http.get("https://viajar360.azurewebsites.net/api/listarciudades");
  }

  createCiudad(info:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/crearciudad", info);
  }

  actualizarCiudad(info:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/editarciudad", info);
  }

  deleteCiudad(datos:any): Observable<any>{
    return this.http.post("https://viajar360.azurewebsites.net/api/borrarciudad",datos);
  }

}
