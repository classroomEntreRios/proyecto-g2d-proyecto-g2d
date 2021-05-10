import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from '../../../services/foro.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-comentar',
  templateUrl: './comentar.component.html',
  styleUrls: ['./comentar.component.css']
})
export class ComentarComponent implements OnInit {

  constructor(public actRoute: ActivatedRoute, public FS: ForoService, public LG: LoginService) { }
  id = this.actRoute.snapshot.params['id'];
  mensaje = ""
  ngOnInit(): void {
  }

  enviar(){
    const envio = { sid: this.LG.GetToken().sid , usuario: this.LG.GetToken().usuario, tema: Number(this.id), mensaje: this.mensaje };
    this.FS.Comentar(envio).subscribe(data => {
      if(data.estado){
        window.alert(data.reporte+" , cuando cierre este cartel se reiniciara la pagina");
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
