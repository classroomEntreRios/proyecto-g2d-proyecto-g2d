import { Component, OnInit } from '@angular/core';
import { ForoService } from '../../../services/foro.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  constructor(public FS: ForoService, public LG: LoginService) { }
  primera = true;
  falla = false;
  admin = false;
  temas:any = []
  resp = {
    error: false,
    reporte: '',
  }
  ngOnInit(): void {
    this.ListarCiudades();
    
  }
  ListarCiudades(){
    this.FS.getTemas().subscribe(data => {
      this.resp.error = !data.estado;
      this.resp.reporte = data.reporte;
      if(!this.resp.error){
        this.temas= data.objeto;
        this.LG.ConnectToken().subscribe(data => {
          if(data.respuesta){
            if(data.flag){this.admin = true;}
          }
        });
        this.primera = false;
      }
      else
      {
        window.alert(this.resp.reporte);
        this.primera = false;
        this.falla = true;
      }
    });
  }

  ioTema(id: number, estado:number){
    const envio = { sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario, id_hilo: id};
    if(estado == 0){
      this.FS.CerrarTema(envio).subscribe(data => {
        if(data.estado){
          window.alert(data.reporte+" , Se procedera a reinciar la pagina");
          window.location.reload();
        }else{
          window.alert(data.reporte);
          console.log(data.error);
        }
      });
    } else {
      this.FS.AbrirTema(envio).subscribe(data => {
        if(data.estado){
          window.alert(data.reporte+" , Se procedera a reinciar la pagina");
          window.location.reload();
        }else{
          window.alert(data.reporte);
          console.log(data.error);
        }
      });
    }
  }

  borrarTema(id: number){
    const envio = { sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario, id_hilo: id};
    this.FS.BorrarTema(envio).subscribe(data => {
      if(data.estado){
        window.alert(data.reporte+" , Se procedera a reinciar la pagina");
        window.location.reload();
      }else{
        window.alert(data.reporte);
        console.log(data.error);
      }
    });
  }
}
