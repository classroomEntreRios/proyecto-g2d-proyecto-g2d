import { Component, OnInit } from '@angular/core';
import { WheaterService } from '../../services/wheater.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  dias = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
  title = 'Viajar 360° - Un estilo en viajes';
  clima: any;
  icono: any;
  lat: 0.0;
  lon: 0.0;
  forecast: any;
  dia1 : number;
  dia2 : number;
  dia3 : number;
  fecha = new Date()
  constructor(private weatherService: WheaterService) {

  }

  ngOnInit() {
    this.dia1 = this.fecha.getDay()+1;
    this.dia2 = this.fecha.getDay()+2;
    this.dia3 = this.fecha.getDay()+3;
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
      );
    this.weatherService.GetLocation(ciudad).subscribe(data=>{
        this.lon = data[0].lon;
        this.lat = data[0].lat;
        const OCApi = {lat: this.lat, lon: this.lon};
        this.weatherService.GetForecast(OCApi).subscribe(data2 => {
          this.forecast = data2
        });
    });
  }




  getWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Paraná,ar&appid=ff1bc4683fc7325e9c57e586c20cc03e')
      .then(response => response.json())
      .then(data => { this.setWeatherData(data); })
    
    this.weatherService.GetLocation("parana").subscribe(data=>{
      this.lon = data[0].lon;
      this.lat = data[0].lat;
      const OCApi = {lat: this.lat, lon: this.lon};
      this.weatherService.GetForecast(OCApi).subscribe(data2 => {
        this.forecast = data2
      });
    });
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