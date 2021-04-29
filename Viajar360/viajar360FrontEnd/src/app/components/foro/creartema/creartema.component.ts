import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ForoService } from '../../../services/foro.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creartema',
  templateUrl: './creartema.component.html',
  styleUrls: ['./creartema.component.css']
})
export class CreartemaComponent implements OnInit {

  constructor(public LG: LoginService, public FS: ForoService, public router: Router) { }
  Usuario: any;
  respuesta=false;
  resp={
    estado: false,
    reporte: '',
    id_tema: -1,
  };
  entrada = new FormGroup({
    titulo: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(255)]),
  });
  ngOnInit(): void {
    this.Usuario = this.LG.GetToken();
  }
  CrearTema(){
    const envio = {usuario: this.Usuario.usuario, sid: this.Usuario.sid, titulo: this.f.titulo.value};
    return this.FS.crearTema(envio).subscribe(data=>{
      this.resp.estado = data.estado;
      this.resp.id_tema = data.id_tema;
      this.resp.reporte = data.reporte;
      if(this.resp.estado){
        this.router.navigate(['/foro/tema/'+this.resp.id_tema]);
      }
      else
      {
        this.respuesta = true;
        console.log(data.error);
      }
    });
  }

  get f(){
    return this.entrada.controls;
  }

}
