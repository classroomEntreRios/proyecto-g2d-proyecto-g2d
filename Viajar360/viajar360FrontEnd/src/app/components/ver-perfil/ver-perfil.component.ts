import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  constructor(public LG: LoginService, public actRoute: ActivatedRoute, public router: Router) { }
  carga_completa=false;
  usuario = {
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    provincia: "",
    localidad: "",
    mail: "",
    foto: "",
    user: "",
  }
  id = this.actRoute.snapshot.params['id'];
  ngOnInit(): void {
    if(!isNaN(Number(this.id))){
      this.obtenerDatos(this.id);
    }
    else{
      this.router.navigate[('/home')];
    } 
  }
  obtenerDatos(id: string){
    this.LG.getdata(id).subscribe(data=>{
      if(data.estado){
        this.usuario = data.objeto;
        this.carga_completa = true;
      }else{
        if(data.error!=null){
          console.log(data.error);
        }
        window.alert(data.reporte);
        window.location.reload();
      }
    });
  }
}
