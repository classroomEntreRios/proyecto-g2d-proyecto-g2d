import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

import { ChatService } from 'src/app/services/chat.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  varchat: string;
  @Input() detallechat = { nombre: '', apellido: '', mensaje: '', mail: ''};
  apellido: string;
  nombre: string;
  mail: string;
  mensaje: string;

  constructor(public chatear: ChatService, public router: Router) { }
  
  resp = {
    error: false,
    reporte: ""
  };
 
  chat: FormGroup;
  ngOnInit(): void {
 
      this.chat = new FormGroup({
        'mail': new FormControl('', [Validators.required, Validators.email] ),
      });
    }
  
    get f() {
      return this.chat.controls;
    }

  submit() {
    this.apellido = this.detallechat.apellido;
    this.nombre = this.detallechat.nombre;
    this.mail = this.detallechat.mail;
    this.mensaje = this.detallechat.mensaje
    const envio = {apellido: this.apellido, nombre: this.nombre, mail: this.mail, mensaje: this.mensaje};
    this.chatear.chateo(envio).subscribe(data =>{
      if(data.estado=true){
        this.resp.error = false;
        this.router.navigateByUrl('/');
      }
      else
      {
        this.resp.error = true;
        this.resp.reporte = data.reporte;
      }
    })
  }

}


