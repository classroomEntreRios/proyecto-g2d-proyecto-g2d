import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUsersService } from '../../../services/admin-users.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listar-busr',
  templateUrl: './listar-busr.component.html',
  styleUrls: ['./listar-busr.component.css']
})
export class ListarBUsrComponent implements OnInit {

  constructor(public LG: LoginService, public AD: AdminUsersService, public router: Router) { }
  primera = true;
  Usuarios:any = []

  ngOnInit(): void {
    this.CargarUsuarios();
  }
  CargarUsuarios(){
    const Envio = {sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario};
    this.AD.listbanusers(Envio).subscribe(data =>{
      if(data.estado){
        this.Usuarios = data.listado;
        this.primera = false;
      }
      else
      {
        window.alert(data.reporte);
        console.log(data.error);
        window.location.reload();
      }
    });
  }
  ReiniciarUsuario(entrada:any){
    const Envio = {sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario, uid: entrada.id_usuario, username: entrada.username}
    if(window.confirm("Esta seguro de que desea perdonar a este usuario?")){
      this.AD.resetUsr(Envio).subscribe(data=>{
        if(data.estado){
          window.alert(data.reporte+", su nuevo pass es '"+data.pass+"', copie esa contraseña y se procedera a reiniciar la pagina");
          window.location.reload();
        } else {
          window.alert(data.reporte);
          console.log(data.error);
        }
      });
    }
  }

  BorrarUsuario(entrada: any){
    const Envio = {sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario, uid: entrada.id_usuario, username: entrada.username}
    if(window.confirm("Esta seguro de que desea borrar este usuario? LOS CAMBIOS SON PERMANENTES E IRREVERSIBLES")){
      this.AD.eliminarusuario(Envio).subscribe(data=>{
        if(data.estado){
          window.alert(data.reporte);
          window.location.reload();
        } else {
          window.alert(data.reporte);
          console.log(data.error);
        }
      });
    }
  }
}
