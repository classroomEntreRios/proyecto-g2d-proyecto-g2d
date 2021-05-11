import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminChatService {

  constructor(private http: HttpClient) { }


  //Traer lista de ciudades

  getChat(entrada: any): Observable<any> {
    return this.http.post("https://localhost:44389/api/contestar",entrada);
  }
 
  actualizarChat(info:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/responder", info);
  }
}
