import { AdminCiudadesService } from './../../../services/admin-ciudades.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'crear-ciudad',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  @Input() detallesCiudad = { id: 0, nombre: '' };

  constructor(
    public adminCiudades: AdminCiudadesService,
    public router : Router
  ) { }

  ngOnInit(): void {
  }

  agregarCiudad(detallesCiudad) {
    this.adminCiudades.createCiudad(this.detallesCiudad).subscribe((data: {}) => {
      this.router.navigate(['lista-ciudad'])
    })
  }

}
