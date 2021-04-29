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
}
