import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
 
  constructor(private http: HttpClient) { }

  banUsr(entrada:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/banuser",entrada);
  }

  resetUsr(entrada:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/pardonuser",entrada);
  }

  listusers(entrada:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/userlist",entrada);
  }

  editarusuario(entrada:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/admineditar",entrada);
  } 

  eliminarusuario(entrada:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/delusr",entrada);
  }

  listbanusers(entrada:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/listbanusers",entrada);
  }

  getuser(entrada:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/obteneruser",entrada);
  }

  mkAdmin(entrada:any): Observable<any> {
    return this.http.post("https://localhost:44389/api/haceradmin", entrada);
  }

}
