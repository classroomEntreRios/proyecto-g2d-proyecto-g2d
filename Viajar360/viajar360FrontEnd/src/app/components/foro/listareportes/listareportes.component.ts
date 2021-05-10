import { Component, OnInit } from '@angular/core';
import { ForoService } from '../../../services/foro.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listareportes',
  templateUrl: './listareportes.component.html',
  styleUrls: ['./listareportes.component.css']
})
export class ListareportesComponent implements OnInit {

  constructor(public FS: ForoService, public LG: LoginService) { }
  primera = true;
  Comentarios:any = []
  ngOnInit(): void {
    this.CargarComentarios();
  }
  CargarComentarios(){
    this.FS.listarReportados().subscribe(data => {
      if(data.estado){
        this.Comentarios = data.objeto;
      }
      else
      {
        console.log(data.reporte);
      }
      this.primera = false;
    });
  }

  PerdonarComentario(id:number)
  {
    const envio = { sid:this.LG.GetToken().sid , usuario: this.LG.GetToken().usuario, id_comentario: id };
    this.FS.perdonarComentario(envio).subscribe(data => {
      if(data.estado){
        window.alert(data.reporte);
        window.location.reload();
      }
      else
      {
        window.alert(data.reporte);
      }
    });
  }

  BorrarComentario(id:number)
  {
    const envio = { sid:this.LG.GetToken().sid , usuario: this.LG.GetToken().usuario, id_comentario: id };
    this.FS.BorrarComentario(envio).subscribe(data => {
      if(data.estado){
        window.alert(data.reporte);
        window.location.reload();
      }
      else
      {
        window.alert(data.reporte);
      }
    });
  }
}
