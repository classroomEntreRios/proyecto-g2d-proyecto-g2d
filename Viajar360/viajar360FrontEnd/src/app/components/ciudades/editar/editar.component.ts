import { Component, OnInit } from '@angular/core';
import { AdminCiudadesService } from 'src/app/services/admin-ciudades.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'editar-ciudad',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  datosCiudad: any = {};

  constructor(

    public serviceCiudades: AdminCiudadesService,
    public actRoute: ActivatedRoute,
    public router: Router

  ) { }

  ngOnInit(): void {

    //Trae los datos de la ciudad elegida para editar
    this.serviceCiudades.getCiudad(this.id).subscribe((data: {}) =>
    {

      this.datosCiudad = data;


    }
    )
  }

  actualizarCiudad() {

    if (window.confirm('Estas seguro de que queres actualizar?')) {

      this.serviceCiudades.actualizarCiudad(this.id, this.datosCiudad).subscribe((data: {}) =>

      {

        this.router.navigate(['lista-ciudades']);

      }
        )

    }
  }

}
