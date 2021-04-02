import { Component, OnInit } from '@angular/core';
import { WheaterService } from '../services/wheater.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  title = 'Viajar360FrontEnd';
  clima;
  constructor(private weatherService: WheaterService) {

  }

  ngOnInit() {
    
  }

  getWeather(ciudad: string, codigo:  string) {
    this.weatherService.getWeather(ciudad, codigo)
    .subscribe (
      res => { 
      console.log(res);
      this.clima = res
    },
      err => console.log(err)
    )
  }
  submitciudad(ciudad: HTMLInputElement, codigo: HTMLInputElement) {
    if (ciudad.value && codigo.value) {
      this.getWeather(ciudad.value, codigo.value);
      ciudad.value = '';
      codigo.value = '';
    } else {
      alert ('Por favor, ingrese datos válidos');
    }
   
    ciudad.focus();
    return false;

  }
}
