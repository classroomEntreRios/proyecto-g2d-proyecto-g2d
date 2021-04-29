import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-general-nav',
  templateUrl: './general-nav.component.html',
  styleUrls: ['./general-nav.component.css']
})
export class GeneralNavComponent implements OnInit {
  logueado=false;
  resp = {
    respuesta: false,
    invalido: false
  }
  constructor(public LG: LoginService) { }

  ngOnInit(): void {
    this.LG.ConnectToken().subscribe(data=>{
      this.resp.respuesta = data.respuesta;
      this.resp.invalido = data.invalido;
      if(this.resp.invalido){
        this.LG.LogOut()
      }else{
        this.logueado = this.resp.respuesta;
      }
    });
  }

}
