import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { AtraccionesService } from '../../../services/atracciones.service'
import { AdminCiudadesService } from '../../../services/admin-ciudades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-atraccion',
  templateUrl: './crear-atraccion.component.html',
  styleUrls: ['./crear-atraccion.component.css']
})
export class CrearAtraccionComponent implements OnInit {
  constructor(public LG: LoginService, public AtrSrv: AtraccionesService, public CidSrv: AdminCiudadesService, public router: Router) { }
  datos = {
    nombre:"",
    id_ciudad:-1,
    ubicacion:"",
    detalles:"",
    nombre_ciudad:"",
  }
  ciudades: any = [];
  token:any;
  ngOnInit(): void {
    this.token = this.LG.GetToken();
    this.obtenerCiudades();
    
  }
  obtenerCiudades(){
    this.CidSrv.getCiudades().subscribe(data => {
      this.ciudades = data.listado;
    });
  }
  cambios(nombre:string){
    this.ciudades.forEach(data=>{
      console.log(data.id_ciudad);
      if(data.nombre == nombre){
        this.datos.id_ciudad = data.id_ciudad;
      }
    });
  }

  agregarAtraccion(){
    const enviar = {  sid: this.token.sid, usuario: this.token.usuario, ubicacion: this.datos.ubicacion,
                      nombre: this.datos.nombre, detalles: this.datos.detalles, id_ciudad: this.datos.id_ciudad};
    if((enviar.ubicacion!="")&&(enviar.nombre!="")&&(enviar.detalles!="")&&(enviar.id_ciudad!=-1)){
      this.AtrSrv.crearAtraccion(enviar).subscribe(data => {
        if(data.estado){
          window.alert(data.reporte+", La pagina se redirigira a la lista cuando cierre este cartel");
          this.router.navigate(['admin-dashboard/4/']);
        }else{
          console.log(data.reporte);
        }
      });
    }else{
      if(enviar.id_ciudad==-1){
        window.alert("debe elegir una ciudad");
      }
      else{
        window.alert("debe llenar todos los datos");
      }
    }
  }
}
