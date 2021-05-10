import { Component, OnInit } from '@angular/core';
import { AdminChatService } from '../../services/admin-chat.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-ver-mensajes',
  templateUrl: './ver-mensajes.component.html',
  styleUrls: ['./ver-mensajes.component.css']
})
export class VerMensajesComponent implements OnInit {

  constructor(

    public serviceChat: AdminChatService,
    public router: Router,
    public LG: LoginService,

  ) { }
  Chat: any = [];  
  primera = true;

  

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes(){
    const envio = { sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario};
    this.serviceChat.getChat(envio).subscribe(data => {
      if(data.estado){
        this.Chat = data.listado;
        this.primera = false;
      }
      else
      {
        window.alert(data.reporte);
        this.primera = false;
      }
    });
  }

  darRespuesta(id_msg: Number){
    const envio = { sid: this.LG.GetToken().sid, usuario: this.LG.GetToken().usuario, id_chat: id_msg};
    this.serviceChat.actualizarChat(envio).subscribe(data => {
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

