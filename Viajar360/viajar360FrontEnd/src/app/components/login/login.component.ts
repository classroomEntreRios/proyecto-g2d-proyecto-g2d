import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  password: string;
  resp = {
    error: false,
    reporte: ""
  };
  Forumulario = new FormGroup({
    Usuario: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
    Pass: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(50),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$')]),
  });
  constructor(public logueo: LoginService, public router: Router) {}
  login() {
    this.usuario = this.Forumulario.controls.Usuario.value;
    this.password = this.Forumulario.controls.Pass.value;
    const user = {usuario: this.usuario, password: this.password};
    this.logueo.login(user).subscribe(data => {
      if (data.estado == true){
        this.logueo.SetToken(data.token,this.usuario);
        this.resp.error = false;
        this.router.navigateByUrl('/');
      }
      else
      {
        this.resp.error = true;
        this.resp.reporte = data.reporte;
      }
    });
  }
  get f(){
    return this.Forumulario.controls;
  }
  ngOnInit(): void {
  }

}
