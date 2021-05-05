import { Component, OnInit } from '@angular/core';
import { AdminCiudadesService } from '../../../services/admin-ciudades.service';
import { AtraccionesService } from '../../../services/atracciones.service';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit {
  Ciudades: any = [];
  Atracciones: any = [];
  seleccionado: "";
  sel_atracc: "";
  id=-1;
  cargando = false;
  resp = {
    error:false,
    reporte:"",
  }
  info = {
    nombre:"",
    detalles:"",
    ubicacion:"",
  }
  primera = true;
  constructor(public serviceCiudades: AdminCiudadesService, public serviceAtracciones: AtraccionesService) { }
  ngOnInit(): void {
    this.cargarCiudades();
  }
  cargarCiudades() {
    return this.serviceCiudades.getCiudades().subscribe(data => {
      this.resp.error = !data.estado;
      this.resp.reporte = data.reporte;
      if (data.estado){
        this.Ciudades = data.listado;
        this.seleccionado = this.Ciudades[0].nombre;
        this.getId(this.seleccionado);
        this.cargarAtracciones(String(this.id));
      }
      
      this.primera=false;
    });
  }
  cargarAtracciones(info){
    this.cargando=true;
    this.serviceAtracciones.obtenerAtracciones(info).subscribe(data =>{
      this.Atracciones = data;
      this.sel_atracc = this.Atracciones[0].nombre;
      this.info.detalles = this.Atracciones[0].detalles;
      this.info.ubicacion = this.Atracciones[0].ubicacion;
      this.info.nombre = this.Atracciones[0].nombre
      this.cargando = false;
    });
  }
  cambiarInfo(nombre: string){
    this.Atracciones.forEach(data =>{
      if(data.nombre == nombre){
        this.info.detalles = data.detalles;
        this.info.ubicacion = data.ubicacion;
        this.info.nombre = data.nombre
      }
    });
  }
  getId(algo: string){
      this.Ciudades.forEach(i => {
        if(i.nombre==algo){
          this.id = i.id_ciudad;
          this.cargarAtracciones(String(this.id));
        }
      });
  }
}
