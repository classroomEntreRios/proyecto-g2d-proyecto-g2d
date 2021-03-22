import { Injectable } from '@angular/core';
import { Usuarioss} from '../models/usuarios.model';
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
formData: Usuarioss;
readonly rootURL = 'https://localhost:44375/api/'
  constructor(private http: HttpClient) { }
postUsuarios(formData:Usuarioss) {
  return this.http.post(this.rootURL+'usuarios',formData);
}
}
