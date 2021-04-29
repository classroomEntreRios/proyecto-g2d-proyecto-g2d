import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Confirmacion } from './registro.validator';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: string;
  contra: string;
  email: string;
  constructor(public logueo: LoginService, public router: Router) { }
  resp = {
    error: false,
    reporte: ""
  };

  user: FormGroup;

  ngOnInit() {
    this.user = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      'password': new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(50),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$')]),
      'confirmpassword': new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(50),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$')]),
      'mail': new FormControl('', [Validators.required, Validators.email] ),
    },{validators: Confirmacion});
  }

  get f() {
    return this.user.controls;
  }
  submit() {
    this.usuario = this.f.username.value;
    this.contra = this.f.password.value;
    this.email = this.f.mail.value;
    const user = {usuario: this.usuario, password: this.contra, email: this.email};
    this.logueo.register(user).subscribe(data =>{
      if(data.estado=true){
        this.logueo.SetToken(data.token,this.usuario)
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
