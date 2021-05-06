import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCiudadesService } from '../../../services/admin-ciudades.service';
import { AtraccionesService } from '../../../services/atracciones.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listar-atraccion',
  templateUrl: './listar-atraccion.component.html',
  styleUrls: ['./listar-atraccion.component.css']
})
export class ListarAtraccionComponent implements OnInit {
  salida = "";
  primera = true;
  atracciones:any = [];
  ciudades:any = [];
  token: any;
  constructor(public AtrSrv: AtraccionesService, public CidSrv: AdminCiudadesService, public tok: LoginService, public router: Router) { }

  ngOnInit(): void {
    this.token = this.tok.GetToken()
    this.cargarAtracciones();
  }
  cargarAtracciones(){
    this.AtrSrv.listarAtracciones().subscribe(data => {
      this.atracciones = data;
      this.primera = false;
      this.cargarCiudades();
    });
  }
  cargarCiudades(){
    this.CidSrv.getCiudades().subscribe(data => {
      this.ciudades = data.listado;
    });
  }
  editar(id:number){
    this.router.navigate(['admin-dashboard/4/'+id]).then(() => { window.location.reload(); });
  }

  obtenerNombre(id:number){
    this.ciudades.forEach(ciudad => {
      if(ciudad.id_ciudad == id){
        this.salida = ciudad.nombre
      }
    });
  }

  borrarAtraccion(id: Number, nombre: string){
    if(window.confirm('Estas seguro de que queres borrar esta ciudad?'))
    {const envio = { sid: this.token.sid, usuario: this.token.usuario, id_atraccion: id, nombre: nombre };
    this.AtrSrv.borrarAtraccion(envio).subscribe(data => {
      if(data.estado){
        window.alert(data.reporte+", Se reiniciara la pagina cuando cierre este cartel");
        window.location.reload();
      }else{
        window.alert(data.reporte);
      }
    });}
  }
}
