import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent implements OnInit {
  @ViewChild('fileInput') userPhoto: ElementRef;
  token = this.LG.GetToken();
  carga_completa = false;
  cardImageBase64: string;
  datos: string;
  id: number;
  subiendo = false;
  seguro_borrado = false;
  defecto = "";
  imageUrl: string = "https://bulma.io/images/placeholders/480x480.png";

  constructor(public LG: LoginService, public router: Router) { }
  user: FormGroup;

  ngOnInit(): void {
    this.LG.ConnectToken().subscribe(data =>{
      if(data.invalido){
        this.router.navigate(['/home']);
      }
    });
    this.user = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      foto: new FormControl(null),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl('', Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')),
      localidad: new FormControl(''),
      provincia: new FormControl(''),
    });
    const obTk = {name: this.token.usuario};
    this.LG.getid(obTk).subscribe(data => {
      this.LG.getdata(data.envio.toString()).subscribe(data2 => {
        this.user.patchValue({
          mail: data2.objeto.mail,
          nombre: data2.objeto.nombre,
          apellido: data2.objeto.apellido,
          direccion: data2.objeto.direccion,
          telefono: data2.objeto.telefono,
          localidad: data2.objeto.localidad,
          provincia: data2.objeto.provincia,
        })
        if(data2.objeto.foto!=null){
          this.defecto = data2.objeto.foto
          this.imageUrl = this.defecto;
        }
        this.carga_completa = true
      });
    
    
    });
    
  }

  onChange(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 10485760;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 480;
        const max_width = 480;

        if (fileInput.target.files[0].size > max_size) {
            window.alert('Maximum size allowed is ' + (max_size/1024)/1024 + 'Mb');
            this.limpiarFoto()
            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            window.alert('Only Images are allowed ( JPG | PNG )');
            this.limpiarFoto()
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
                if (img_height > max_height && img_width > max_width) {
                    window.alert('Maximum dimentions allowed '+max_height+'*'+max_width+'px');
                    this.limpiarFoto()
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.imageUrl = e.target.result;
                }
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  get f(){
    return this.user.controls;
  }

  limpiarFoto(){
    this.userPhoto.nativeElement.value = null;
    this.imageUrl = "https://bulma.io/images/placeholders/480x480.png";
  }

  actualizar(){
    this.subiendo = true;
    this.datos = this.imageUrl;
    if (this.datos == "https://bulma.io/images/placeholders/480x480.png" || this.datos=="https://localhost:44389"+this.defecto){ 
      this.datos = ""
    }else{
      console.log('llegue aca');
      this.datos = this.datos.substring(this.datos.indexOf(',')+1);
    }
    const enviar = {
      sid:this.token.sid,
      usuario: this.token.usuario,
      mail: this.f.mail.value,
      foto: this.datos,
      nombre: this.f.nombre.value,
      apellido: this.f.apellido.value,
      direccion: this.f.direccion.value,
      telefono: this.f.telefono.value,
      localidad: this.f.localidad.value,
      provincia: this.f.provincia.value,
    };
    this.LG.editarUser(enviar).subscribe(data => {
      if(data.estado){
        this.subiendo = true;
        window.location.reload();
      }
      else{
        this.subiendo = true;
        window.alert(data.reporte);
        console.log(data.error);
      }
    });
  }
}
