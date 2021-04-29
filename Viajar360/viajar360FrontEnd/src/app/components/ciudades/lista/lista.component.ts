import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCiudadesService } from '../../../services/admin-ciudades.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'lista-ciudad',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  Ciudades: any = [];
  primera= true;
  resp = {
    error: false,
    reporte: "",
    token: "",
    usuario: "",
  };

  resp_borrado = {
    error: false,
    reporte: ""
  };
  token: any;


  constructor(public serviceCiudades: AdminCiudadesService, public LG: LoginService, public router: Router) { }

  ngOnInit(): void {
    this.cargarCiudades();
    this.token = this.LG.GetToken();
  }

  //Cargar lista de ciudades
  cargarCiudades() {
    return this.serviceCiudades.getCiudades().subscribe(data => {
      this.resp.error = !data.estado;
      this.resp.reporte = data.reporte;
      if (data.estado){
        this.Ciudades = data.listado;
      }
      this.primera=false;
    });
  }

  borrarCiudad(id,nombre) {
    if (window.confirm('Estas seguro de que queres borrar?')) {
      const Envio = { nombre: nombre, id: Number(id), sid: this.token.sid, usuario: this.token.usuario,}
      this.serviceCiudades.deleteCiudad(Envio).subscribe(data => {
        this.resp_borrado.error = !data.estado;
        this.resp_borrado.reporte = data.reporte;
        if (!this.resp_borrado.error){
          this.router.navigate(['/dummy/0']);
          window.alert(this.resp_borrado.reporte);
        }else{
          this.router.navigate(['/dummy/0']);
          window.alert(this.resp_borrado.reporte);
        }
      });
    }
  }
}






