import { Component, OnInit } from '@angular/core';
import { AdminCiudadesService } from '../../../services/admin-ciudades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'editar-ciudad',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  salida:Boolean;
  id = this.actRoute.snapshot.params['info'];
  datosCiudad = {
    id: "",
    nombre: "",
    Nuevo: "",
  };
  usuario: any;
  resp = {
    error: false,
    reporte: "",
  }

  envio = {
    nombre: "",
    id: 0,
    sid: "",
    usuario: "",
    nuevo: ""
  }
  constructor(

    public serviceCiudades: AdminCiudadesService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public lg: LoginService,

  ) { }

  ngOnInit(): void {

    //Trae los datos de la ciudad elegida para editar
    if (this.EsNumero(this.id)&&this.id!=null){
      this.serviceCiudades.getCiudad(Number(this.id)).subscribe(data =>
      {
        this.resp.error = !data.estado;
        this.resp.reporte = data.reporte;
        if(!this.resp.error){
          this.datosCiudad.id = data.objeto.id_ciudad;
          this.datosCiudad.nombre = data.objeto.nombre;
          this.datosCiudad.Nuevo = data.objeto.nombre;
        }
      }
      );
    }
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

  actualizarCiudad() {
    try{
      Number(this.datosCiudad.id)
      this.salida = true;
    }
    catch
    {
      this.salida = false;
    }
    if (this.salida){
      if(this.datosCiudad.nombre != "" && this.datosCiudad.Nuevo != "" && this.datosCiudad.Nuevo != this.datosCiudad.nombre){
        if (window.confirm('Estas seguro de que queres actualizar?')) {
          this.usuario = this.lg.GetToken();
          this.envio.id = Number(this.datosCiudad.id);
          this.envio.nombre = this.datosCiudad.nombre;
          this.envio.nuevo = this.datosCiudad.Nuevo;
          this.envio.sid = this.usuario.sid;
          this.envio.usuario = this.usuario.usuario;

          this.serviceCiudades.actualizarCiudad(this.envio).subscribe(data => {
            this.resp.error = !data.estado;
            if(!this.resp.error){
              this.router.navigate(['/dummy/'+this.datosCiudad.id]);
            }
            else{
              this.resp.reporte = data.reporte;
              window.alert(this.resp.reporte);
            }
          });
        }
      } else {
        window.alert("el nombre y el nuevo nombre son requeridos y tienen que ser distintos entre si")
      }
    } else {
      window.alert("La id tiene que ser un numero entero");
    }
  }

}
