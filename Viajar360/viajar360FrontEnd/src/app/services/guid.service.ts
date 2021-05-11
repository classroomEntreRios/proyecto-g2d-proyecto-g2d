import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GuidService {

  constructor(private cookie: CookieService,private http: HttpClient) { }
  CheckIdentificacion(){
    return this.cookie.check('identificador');
  }

  GenerarGuid() : Observable<any>{
    return this.http.get('https://localhost:44389/api/getguid');
  }
  SetGUID(guid:string){
    this.cookie.set('identificador', guid);
  }
}
