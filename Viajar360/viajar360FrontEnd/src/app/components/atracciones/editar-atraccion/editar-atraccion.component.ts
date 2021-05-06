import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCiudadesService } from '../../../services/admin-ciudades.service';
import { AtraccionesService } from '../../../services/atracciones.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-editar-atraccion',
  templateUrl: './editar-atraccion.component.html',
  styleUrls: ['./editar-atraccion.component.css']
})
export class EditarAtraccionComponent implements OnInit {

  constructor(    
    public serviceCiudades: AdminCiudadesService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public lg: LoginService,
    public AtrSrv: AtraccionesService,
    ) { }
    primera = true;
    id = this.actRoute.snapshot.params['info'];
    token: any;
    ciudades: any = [];
    datos = {
      id_atraccion:0,
      id_ciudad:0,
      nombre_ciudad:"",
      nombre:"",
      detalles:"",
      ubicacion:"",
    };
  ngOnInit(): void {
    this.serviceCiudades.getCiudades().subscribe(citys => {
      this.ciudades = citys.listado;
      if(this.EsNumero(this.id) && this.id!=null){
        this.obtenerTodo(this.id);
      }else{
        this.primera = false;
      }
    });
    this.token = this.lg.GetToken();
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
  obtenerTodo(id: string){
    this.AtrSrv.obtenerAtracciones(id).subscribe(data => {
      this.datos.id_atraccion = data.id_atraccion;
      this.datos.detalles = data.detalles;
      this.datos.id_ciudad = data.id_ciudad;
      this.datos.ubicacion = data.ubicacion;
      this.datos.nombre = data.nombre;
      this.primera = false;
      this.ciudades.forEach(lugar => {
        if(lugar.id_ciudad == this.datos.id_ciudad){
          this.datos.nombre_ciudad = lugar.nombre;
        }
      });
    }); 
  }

  cambiarDatos(nombre: string){
    this.ciudades.forEach(lugar => {
      if(lugar.nombre == nombre){
        this.datos.id_ciudad = lugar.id_ciudad;
      }
    });
  }

  actualizarAtraccion(){
    const envio = { sid: this.token.sid, usuario: this.token.usuario, ubicacion: this.datos.ubicacion, id_atraccion: this.datos.id_atraccion,
      detalles: this.datos.detalles, id_ciudad: this.datos.id_ciudad, nombre: this.datos.nombre};
    if(window.confirm('Estas seguro de que queres actualizar?'))
    {
      if((this.datos.id_atraccion != -1)&&(this.datos.id_ciudad != -1)&&(this.datos.nombre != "")&&(this.datos.ubicacion != "")&&(this.datos.detalles != "")){
        this.AtrSrv.editarAtraccion(envio).subscribe(data =>{
          if(data.estado){
            window.alert(data.reporte+", cuando cierre este cartel se reiniciara la pagina");
            window.location.reload();
            return null;
          } else {
            window.alert(data.reporte);
            return null;
          }
        });
      }else{
        window.alert("faltan datos");
      }
    }
  }

}
