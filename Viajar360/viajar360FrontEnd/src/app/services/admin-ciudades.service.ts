import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ciudad } from '../shared/ciudad';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


/*Rever todos los metodos para comodar las url de acuerdo al metodo del back que consulten*/


@Injectable({
  providedIn: 'root'
})
export class AdminCiudadesService {

  //Aca va a ir la url de la API para las ciudades.
  apiURL = "asdasdasd";

  constructor(private http: HttpClient) { }

  //DETERMINAMOS EL FORMATO DE CONTENIDO QUE VA A VENIR DESDE EL BACK
  //PARA QUE EL FRONT LO INTERPRETE PARA SERVIRLO AL USUARIO

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //Traer ciudad desde el back

  getCiudad(id): Observable<Ciudad> {
    return this.http.get<Ciudad>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

//Traer lista de ciudades

  getCiudades(): Observable<Ciudad> {
    return this.http.get<Ciudad>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //Crear Ciudad

  createCiudad(ciudad): Observable<Ciudad> {
    //Metodo para enviar ciudad creada al back, esta seteada para enviarla como JSON
    return this.http.post<Ciudad>(this.apiURL, JSON.stringify(ciudad), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  actualizarCiudad(id, ciudad): Observable<Ciudad> {
    return this.http.put<Ciudad>(this.apiURL + '/ciudades/' + id, JSON.stringify(ciudad), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteCiudad(id) {
    return this.http.delete<Ciudad>(this.apiURL, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }




  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Esto trae el error del lado del usuario
      errorMessage = error.error.message;
    } else {
      // Esto trae el error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
