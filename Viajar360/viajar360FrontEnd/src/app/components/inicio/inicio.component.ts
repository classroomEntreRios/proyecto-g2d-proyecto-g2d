import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public logueo: LoginService) {}
  ingreso = false;
  ngOnInit(): void {
    this.logueo.ConnectToken().toPromise().then(data => {
        if(data.respuesta == true){
          this.ingreso = true
        }
        else
        {
          if(data.invalido == true){
            this.logueo.LogOut();
          }
        }
        // console.log(data.respuesta,"--",data.invalido);
    });
    
    console.log("Esto es ingreso: ",this.ingreso);
  }

}
