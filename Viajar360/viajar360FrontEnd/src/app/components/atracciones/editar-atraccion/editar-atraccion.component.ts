import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCiudadesService } from '../../../services/admin-ciudades.service';
import { AtraccionesService } from '../../../services/atracciones.service';
import { LoginService } from '../../../services/login.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-editar-atraccion',
  templateUrl: './editar-atraccion.component.html',
  styleUrls: ['./editar-atraccion.component.css']
})
export class EditarAtraccionComponent implements OnInit {

  @ViewChild('fileInput') userPhoto: ElementRef;
  constructor(    
    public serviceCiudades: AdminCiudadesService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public lg: LoginService,
    public AtrSrv: AtraccionesService,
    ) { }
    cardImageBase64: string;
    imageUrl: string = "https://bulma.io/images/placeholders/480x480.png";
    primera = true;
    id = this.actRoute.snapshot.params['info'];
    token: any;
    ciudades: any = [];
    defecto = "";
    datos = {
      id_atraccion:0,
      id_ciudad:0,
      nombre_ciudad:"",
      nombre:"",
      detalles:"",
      ubicacion:"",
      foto:"",
      borrarfoto: false,
    };
  ngOnInit(): void {
    this.serviceCiudades.getCiudades().subscribe(citys => {
      this.ciudades = citys.listado;
      if(this.EsNumero(this.id) && this.id!=null){
        this.obtenerTodo(this.id);
      }else{
        this.primera = false;
      }
    });
    this.token = this.lg.GetToken();
  }
  EsNumero(variable: string) {
    if(isNaN(Number(variable))){
      return false;
    }
    else
    {
      return true;
    }
  }
  obtenerTodo(id: string){
    this.AtrSrv.obtenerAtracciones(id).subscribe(data => {
      this.datos.id_atraccion = data.id_atraccion;
      this.datos.detalles = data.detalles;
      this.datos.id_ciudad = data.id_ciudad;
      this.datos.ubicacion = data.ubicacion;
      this.datos.nombre = data.nombre;
      if(data.foto !=null){
        this.datos.foto = data.foto;
        this.defecto = data.foto;
      }
      this.primera = false;
      this.ciudades.forEach(lugar => {
        if(lugar.id_ciudad == this.datos.id_ciudad){
          this.datos.nombre_ciudad = lugar.nombre;
        }
      });
    }); 
  }

  cambiarDatos(nombre: string){
    this.ciudades.forEach(lugar => {
      if(lugar.nombre == nombre){
        this.datos.id_ciudad = lugar.id_ciudad;
      }
    });
  }

  actualizarAtraccion(){
    if (this.datos.foto==this.defecto || this.datos.foto==null){ 
      this.datos.foto = ""
    }else{
      this.datos.foto = this.datos.foto.substring(this.datos.foto.indexOf(',')+1);
    }
    const envio = { sid: this.token.sid, usuario: this.token.usuario, ubicacion: this.datos.ubicacion, id_atraccion: this.datos.id_atraccion,
      detalles: this.datos.detalles, id_ciudad: this.datos.id_ciudad, nombre: this.datos.nombre, foto: this.datos.foto, borrarfoto: this.datos.borrarfoto};
    if(window.confirm('Estas seguro de que queres actualizar?'))
    {
      if((this.datos.id_atraccion != -1)&&(this.datos.id_ciudad != -1)&&(this.datos.nombre != "")&&(this.datos.ubicacion != "")&&(this.datos.detalles != "")){
        this.AtrSrv.editarAtraccion(envio).subscribe(data =>{
          if(data.estado){
            window.alert(data.reporte+", cuando cierre este cartel se reiniciara la pagina");
            window.location.reload();
            return null;
          } else {
            console.log(data.error);
            window.alert(data.reporte);
            return null;
          }
        });
      }else{
        window.alert("faltan datos");
      }
    }
  }

  onChange(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 10485760;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 480;
        const max_width = 480;

        if (fileInput.target.files[0].size > max_size) {
            window.alert('Tamaño maximo permitido de ' + (max_size/1024)/1024 + 'Mb');
            this.limpiarFoto()
            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            window.alert('Solo son permitidas imagenes de tipo ( JPG | PNG )');
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
                    window.alert('Tamaño maximo permitido de '+max_height+'*'+max_width+'px');
                    this.limpiarFoto()
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.imageUrl = e.target.result;
                    this.datos.foto = this.imageUrl
                    this.datos.borrarfoto = false;
                }
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  limpiarFoto(){
    this.userPhoto.nativeElement.value = null;
    this.imageUrl = "https://bulma.io/images/placeholders/480x480.png";
    this.datos.foto = null;
    this.datos.borrarfoto = true;
  }

}
