import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'node:console';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-borrar-cuenta',
  templateUrl: './borrar-cuenta.component.html',
  styleUrls: ['./borrar-cuenta.component.css']
})
export class BorrarCuentaComponent implements OnInit {

  constructor(public LG: LoginService, public router: Router) { }
  ClaveDeBorrado = "";
  datos: any;
  carga_completa = false;
  lectura = "";
  seguro_borrado = false;
  num_A = Math.floor(Math.random() * 9) + 1;
  num_B = Math.floor(Math.random() * 9) + 1;
  num_read = 0;
  ngOnInit(): void {
    this.LG.ConnectToken().subscribe(data =>{
      if(data.invalido){
        this.router.navigate(['/home']);
      }
    });
    this.datos = this.LG.GetToken();
    this.LG.getRemoveKey(this.datos).subscribe(data => {
      if(data.estado == true){
        this.carga_completa = true;
        this.ClaveDeBorrado = data.clave;
      }
      else
      {
        if(data.error!=""){
          console.log(data.error);
          window.location.reload();
        }
      }
    });
  }

  nuevosValores(){
    this.num_A = Math.floor(Math.random() * 9) + 1;
    this.num_B = Math.floor(Math.random() * 9) + 1;
  }

  borradoFinal(){
    const envio = {
      sid: this.datos.sid,
      usuario: this.datos.usuario,
      removekey: this.lectura,
    }
    if(window.confirm("¿Esta seguro de que desea borrar permanentemente esta cuenta?")){
      if(window.confirm("REPITO, ¿REALMENTE QUIERE BORRRAR ¡¡¡PERMANENTEMENTE!! ESTA CUENTA?")){
        if(Number(this.num_read) == (this.num_A + this.num_B)){
          this.LG.borrarCuenta(envio).subscribe(data => {
            if(data.estado){
              this.LG.LogOut();
              this.router.navigate(['/perfil']);
            } else {
              console.log(data.error);
              window.alert(data.reporte);
            }
          });
        }
        else{
          window.alert('respuesta a cuenta incorrecta intentelo de nuevo');
          this.nuevosValores();
          return false;
        }
      }
    }
  }
}
