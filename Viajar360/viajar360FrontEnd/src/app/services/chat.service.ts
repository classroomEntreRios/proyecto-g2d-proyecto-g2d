import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  testToken = {
    usuario: '',
    sid: ''
  }
  salida = false;
  constructor(private http: HttpClient, private cookie: CookieService) { }
  chateo(chat: any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/chats", chat);
  }
  
 
}