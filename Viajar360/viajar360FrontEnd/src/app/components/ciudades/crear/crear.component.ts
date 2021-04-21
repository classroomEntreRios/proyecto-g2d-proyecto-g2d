import { AdminCiudadesService } from './../../../services/admin-ciudades.service';
import { LoginService } from '../../../services/login.service'
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'crear-ciudad',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  Nciudad: string;
  @Input() detallesCiudad = { nombre: ''};
  resp = {
    error: false,
    reporte: ""
  };
  Usuario: any;

  constructor(
    public adminCiudades: AdminCiudadesService,
    public router : Router,
    public LS : LoginService,
  ) { }

  ngOnInit(): void {
  }

  agregarCiudad(detallesCiudad) {
    this.Nciudad = this.detallesCiudad.nombre;
    if(this.Nciudad!=''){
      if(!(this.Nciudad.length > 25)){
        this.Usuario = this.LS.GetToken();
        const Envio = { nombre: this.Nciudad, usuario: this.Usuario.usuario, sid: this.Usuario.sid };
        this.adminCiudades.createCiudad(Envio).subscribe(data => {
          if(data.estado==true){
            this.router.navigate(['lista-ciudad']);
          }
          else
          {
            this.resp.error = true;
            this.resp.reporte = data.reporte;
            window.alert(this.resp.reporte);
          }
        });
      }else{
        window.alert("El nombre no puede contener mas de 25 caracteres");
      }
    }else{
      window.alert("El nombre no puede estar vacio");
    }
  }

}
