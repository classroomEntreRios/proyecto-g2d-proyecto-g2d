import { Component, OnInit } from '@angular/core';
import { WheaterService } from 'src/app/services/wheater.service';

@Component({
  selector: 'app-logueado',
  templateUrl: './logueado.component.html',
  styleUrls: ['./logueado.component.css']
})
export class LogueadoComponent implements OnInit {

 
  title = 'Viajar360FrontEnd';
  clima: any;
  constructor(private weatherService: WheaterService) {

  }

  ngOnInit() {
   
    this.clima = {
      main : {},
      isDay: true
    };
    
    this.getWeatherData();
    console.log(this.clima);
  }

  getWeather(ciudad: string, codigo:  string) {
    codigo = 'Ar';
 
    this.weatherService.getWeather(ciudad, codigo)
    .subscribe (
      res => { 
      console.log(res);
      this.clima = res
    },
      err => console.log(err)
    )
  
 }

  
  

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Paraná,ar&appid=ff1bc4683fc7325e9c57e586c20cc03e')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data){
    this.clima = data;
    let sunsetTime = new Date(this.clima.sys.sunset * 1000);
    this.clima.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.clima.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.clima.temp_celcius = (this.clima.main.temp);
    this.clima.temp_min = (this.clima.main.temp_min);
    this.clima.temp_max = (this.clima.main.temp_max);
    
  }

  submitciudad(ciudad: HTMLInputElement, codigo: HTMLInputElement) {
    codigo.value = 'Ar';
    if (ciudad.value && codigo.value) {
      this.getWeather(ciudad.value, codigo.value);
      ciudad.value = '';
     
    } else {
      alert ('Por favor, ingrese datos válidos');
    }
   
    ciudad.focus();
    return false;

  }
}

