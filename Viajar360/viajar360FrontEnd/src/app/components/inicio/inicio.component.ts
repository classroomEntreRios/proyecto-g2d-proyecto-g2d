import { Component, OnInit } from '@angular/core';
import { WheaterService } from '../../services/wheater.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  title = 'Viajar 360° - Un estilo en viajes';
  clima: any;
  icono: any;
  constructor(private weatherService: WheaterService) {

  }

  ngOnInit() {

    this.clima = {
      main: {},
      weather: [],
    
     
    };

    this.getWeatherData();

  }
  

  getWeather(ciudad: string, codigo: string) {
    codigo = 'Ar';

    this.weatherService.getWeather(ciudad, codigo)
      .subscribe(
        res => {
          this.clima = res
        },
        err => console.log(err)
      )

  }




  getWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Paraná,ar&appid=ff1bc4683fc7325e9c57e586c20cc03e')


      .then(response => response.json())
      .then(data => { this.setWeatherData(data); })
  }

  setWeatherData(data) {
    data.main.temp = (data.main.temp - 273.15).toFixed(2);
    data.main.temp_max = (data.main.temp_max - 273.15).toFixed(2);
    data.main.temp_min = (data.main.temp_min - 273.15).toFixed(2);
    data.main.icono = (data.main.icon);
    this.clima = data;
    let sunsetTime = new Date(this.clima.sys.sunset * 1000);
    this.clima.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.clima.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.clima.temp_celcius = (this.clima.main.temp);
    this.clima.temp_min = (this.clima.main.temp_min);
    this.clima.temp_max = (this.clima.main.temp_max);
    this.clima.icono = (this.clima.main.icon);
  }

  submitciudad(ciudad: HTMLInputElement, codigo: HTMLInputElement) {
    codigo.value = 'Ar';
    if (ciudad.value && codigo.value) {
      this.getWeather(ciudad.value, codigo.value);
      ciudad.value = '';

    } else {
      alert('Por favor, ingrese datos válidos');
    }

    ciudad.focus();
    return false;
  }

}