import { Component, OnInit } from '@angular/core';
import { AtraccionesService } from '../../../services/atracciones.service';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent implements OnInit {
  primera = true;
  sel_atracc = ""
  atracciones: any = [];
  info = {
    nombre:"",
    detalles:"",
    ubicacion:"",
  }
  constructor(public AtrSrv: AtraccionesService) { }

  ngOnInit(): void {
    this.cargarAtracciones();
  }
  cargarAtracciones(){
    this.AtrSrv.listarAtracciones().subscribe(data => {
      this.atracciones = data;
      this.sel_atracc = this.atracciones[0].nombre;
      this.cambiarInfo(this.sel_atracc);
      this.primera = false;
    });
  }
  cambiarInfo(nombre: string){
    this.atracciones.forEach(data => {
      if(data.nombre == nombre){
        this.info.detalles = data.detalles;
        this.info.ubicacion = data.ubicacion;
        this.info.nombre = data.nombre
      }
    });
  }
}
