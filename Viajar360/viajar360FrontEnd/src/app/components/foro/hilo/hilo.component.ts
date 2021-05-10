import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from '../../../services/foro.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-hilo',
  templateUrl: './hilo.component.html',
  styleUrls: ['./hilo.component.css']
})
export class HiloComponent implements OnInit {

  constructor(public actRoute: ActivatedRoute, public FS: ForoService, public LG: LoginService) { }
  id = this.actRoute.snapshot.params['id'];
  uid = 0;
  comentarios: any = [];
  usuarios: any = [];
  usuario: any;
  totalusr = 0;
  primera = true;
  iniciosesion = false;
  administrador = false;
  aux="";
  ngOnInit(): void {
    this.obtenerComentarios(this.id);
  }

  obtenerComentarios(id: string){
    this.FS.getComentarios(id).subscribe(data => {
      if(data.estado){
        this.comentarios = data.objeto;
        this.usuarios = data.listado;
        this.totalusr = data.total;
        this.Conectar();
        this.primera = false;
      }
      else
      {
        window.alert(data.reporte);
        console.log(data.error);
      }
    });
  }
  Conectar(){
    this.LG.ConnectToken().subscribe(data => {
      if(data.respuesta){
        if(data.flag){this.administrador = true;}
        this.iniciosesion = true;
        this.FS.obtenerUserid(this.LG.GetToken()).subscribe(data2 => {
          if(data2.estado){
            this.uid = data2.reporte;
          }
        });
      }
      else {
        this.iniciosesion = false;
      }
    });
    
  }
  ObtenerUsuario(id: any){
    for(let i=0; i<=this.totalusr; i++){
      this.aux = "this.usuarios.A"+String(i)+".m_Item1";
      if(eval(this.aux) == id){
        return eval("this.usuarios.A"+String(i));
      }  
    }
  }
  valido(id: number){
    if(id = this.uid){
      return true;
    } else {
      return false;
    }
  }

  reportarComentario(id: number){
    const envio = { sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario, id_comentario: id};
    this.FS.reportarComentario(envio).subscribe(data =>{
      if(data.estado){
        window.alert(data.reporte);
        return 0;
      }
      else
      {
        console.log(data.error);
        window.alert(data.reporte);
      }
    });
  }

  borrarComentario(id: number){
    const envio = { sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario, id_comentario: id};
    this.FS.BorrarComentario(envio).subscribe(data => {
      if(data.estado){
        window.alert(data.reporte+" , La pagina se reiniciara cuando cierre este cartel");
        window.location.reload();
      }
      else
      {
        window.alert(data.reporte);
        console.log(data.error);
      }
    });
  }

}
