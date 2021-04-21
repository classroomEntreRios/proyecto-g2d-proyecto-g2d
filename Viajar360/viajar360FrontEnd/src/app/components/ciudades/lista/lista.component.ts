import { Component, OnInit } from '@angular/core';
import { AdminCiudadesService } from '../../../services/admin-ciudades.service';

@Component({
  selector: 'lista-ciudad',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  Ciudades: any = [];

  constructor(public serviceCiudades: AdminCiudadesService) { }

  ngOnInit(): void {
    this.cargarCiudades();
  }

  //Cargar lista de ciudades
  cargarCiudades() {
    return this.serviceCiudades.getCiudades().subscribe((data: {}) => {
      this.Ciudades = data;
    })
  }

  borrarCiudad(id) {
    if (window.confirm('Estas seguro de que queres borrar?')) {
      this.serviceCiudades.deleteCiudad(id).subscribe(data => {
        this.cargarCiudades();
      })
    }

  }



}






