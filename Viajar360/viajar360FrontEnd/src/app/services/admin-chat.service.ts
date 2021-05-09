import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminChatService {

  constructor(private http: HttpClient) { }


  //Traer lista de ciudades

  getChat(info:any): Observable<any> {
    return this.http.get("https://localhost:44389/api/contestar");
  }
 
  actualizarChat(info:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/modificar_respondido", info);
  }
}
