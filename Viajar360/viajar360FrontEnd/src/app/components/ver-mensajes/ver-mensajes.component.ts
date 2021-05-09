import { Component, OnInit } from '@angular/core';
import { AdminChatService } from '../../services/admin-chat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-mensajes',
  templateUrl: './ver-mensajes.component.html',
  styleUrls: ['./ver-mensajes.component.css']
})
export class VerMensajesComponent implements OnInit {

  envio = {
    nombre: "",
    id_chat: 0,
    apellido: "",
    mensaje: "",
    respondido: true,
  }
  salida: Boolean;
  id = this.actRoute.snapshot.params['info'];
  chat = {
    id: 0,
    apellido: "",
    nombre: "",
    mensaje: "",
    respondido: true,
  }
  id_chat: any;
  primera = true;
  resp = {
    error: false,
    reporte: '',
  };

  constructor(

    public serviceChat: AdminChatService,
    public actRoute: ActivatedRoute,
    public router: Router,

  ) { }

  ngOnInit(): void {
    this.cargarMensajes();

  }

  //Cargar lista de ciudades
  cargarMensajes() {
    return this.serviceChat.getChat(Number(this.id_chat)).subscribe(data => {
      this.resp.error = !data.estado;
      this.resp.reporte = data.reporte;
      if (data.estado) {
        this.chat = data.listado;
      }
      this.primera = false;
    });
  }

  darRespuesta() {
    try {
      Number(this.chat.id)
      this.salida = true;
    }
    catch
    {
      this.salida = false;
    }
    if (this.salida) {
      if (window.confirm('¿Estás seguro de que contestaste este mensaje?')) {
        this.envio.respondido = true;
        this.serviceChat.actualizarChat(this.envio).subscribe(data => {
          this.resp.error = !data.estado;
          if (!this.resp.error) {
            this.router.navigate(['/' + this.chat.id]);
          }
          else {
            this.resp.reporte = data.reporte;
            window.alert(this.resp.reporte);
          }
        });
      }
    } else {
      window.alert("Existió un error al modificar la base de datos")
    }

  }


}

