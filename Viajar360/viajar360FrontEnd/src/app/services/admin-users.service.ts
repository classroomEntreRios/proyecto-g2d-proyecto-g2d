import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
 
  constructor(private http: HttpClient) { }

  banUsr(entrada:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/banuser",entrada);
  }

  resetUsr(entrada:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/pardonuser",entrada);
  }

  listusers(entrada:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/userlist",entrada);
  }

  editarusuario(entrada:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/admineditar",entrada);
  } 

  eliminarusuario(entrada:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/delusr",entrada);
  }

  listbanusers(entrada:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/listbanusers",entrada);
  }

  getuser(entrada:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/obteneruser",entrada);
  }

  mkAdmin(entrada:any): Observable<any> {
    return this.http.post("https://viajar360.azurewebsites.net/api/haceradmin", entrada);
  }

}
