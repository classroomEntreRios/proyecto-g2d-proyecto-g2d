import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AdminUsersService } from '../../../services/admin-users.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-ad-ed-usr',
  templateUrl: './ad-ed-usr.component.html',
  styleUrls: ['./ad-ed-usr.component.css']
})
export class AdEdUsrComponent implements OnInit {
  constructor(public LG: LoginService, public AD: AdminUsersService, public router: Router, public actRoute: ActivatedRoute,) { }
  primera = true;
  falla = false;
  comentario = "";
  id = this.actRoute.snapshot.params['info'];

  cambios = {
    foto: false,
    nombre: false,
    apellido: false,
    direccion: false,
    provincia: false,
    localidad: false,
    telefono: false,
  }

  datos = {
    foto: "",
    nombre: "",
    apellido: "",
    direccion: "",
    provincia: "",
    localidad: "",
    telefono: "",
  }
  valido = false;

  ngOnInit(): void {
    console.log(Number(this.id))
    if(this.EsNumero(this.id)){
      this.obtenerDatos(Number(this.id));
    }
    else
    {
      this.primera = false;
      this.falla = true;
      this.comentario = "Seleccione una id valida";
    }
  }

  EsNumero(variable: string) {
    if(isNaN(Number(variable))){
      return false;
    }
    else
    {
      return true;
    }
  }

  Modif(){
    if(this.cambios.foto||this.cambios.nombre||this.cambios.apellido||
      this.cambios.direccion||this.cambios.provincia||
      this.cambios.localidad||this.cambios.telefono){
        this.valido=true;
      } else {
        this.valido=false;
      }
  }

  obtenerDatos(id:number){
    const envio = { sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario, uid: id};
    this.AD.getuser(envio).subscribe(data =>{
      if(data.estado){
        if(data.objeto.foto != ""){
          this.datos.foto = data.objeto.foto;
        }
        this.datos.apellido = data.objeto.apellido;
        this.datos.nombre = data.objeto.nombre;
        this.datos.direccion = data.objeto.direccion;
        this.datos.localidad = data.objeto.localidad;
        this.datos.provincia = data.objeto.provincia;
        this.datos.telefono = data.objeto.telefono;
        this.primera = false;
      } else {
        this.primera = false;
        this.falla = true;
        this.comentario = data.reporte;
        console.log(data.error);
      }
    });
  }

  EditarUsuario(){
    const envio = { sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario, apellido: this.cambios.apellido,
                    nombre: this.cambios.nombre, direccion: this.cambios.direccion, telefono: this.cambios.telefono,
                    localidad: this.cambios.localidad, provincia: this.cambios.provincia, foto: this.cambios.foto, uid: Number(this.id) };
    if(window.confirm("esta seguro que desea realizar estos cambios, Tenga en cuenta que estos cambios son IRREVERSIBLES!!!")){
      this.AD.editarusuario(envio).subscribe(data => {
        if(data.estado){
          window.alert(data.reporte+", cuando cierre este cartel se reiniciara la pagina");
          window.location.reload();
        } else {
          window.alert(data.reporte);
          console.log(data.error);
        }
      });
    }
  }
}
