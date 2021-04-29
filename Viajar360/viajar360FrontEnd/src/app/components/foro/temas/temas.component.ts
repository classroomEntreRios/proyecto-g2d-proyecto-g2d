import { Component, OnInit } from '@angular/core';
import { ForoService } from '../../../services/foro.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  constructor(public FS: ForoService) { }
  primera = true;
  falla = false;
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
}
