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
      weather: {},
    
     
    };

    this.getWeatherData();

    console.log(this.clima);

  }
  resolverimagen() {
    if ((this.clima.weather.icon) = '01d') {
      return 'https://www.seekpng.com/png/full/169-1698241_imagen-sol-png-svg-free-download-sun-vector.png'
    
    };
    if ((this.clima.icon) = '02d') {
      return 'https://openweathermap.org/img/wn/02d@2x.png'
     
    };
    if ((this.clima.weather.icon) = '03d') {
      return 'https://openweathermap.org/img/wn/03d@2x.png'
  
    };
    if ((this.clima.icon) = '04d') {
      return 'https://openweathermap.org/img/wn/04d@2x.png'
    
    };
    if ((this.clima.icon) = '09d') {
      return 'https://openweathermap.org/img/wn/09d@2x.png'
    
    };
    if ((this.clima.icon) = '10d') {
      return 'https://openweathermap.org/img/wn/10d@2x.png'
    
    };
    if ((this.clima.icon) = '11d') {
      return 'https://openweathermap.org/img/wn/11d@2x.png'
  
    };
    if ((this.clima.icon) = '13d') {
      return'https://openweathermap.org/img/wn/13d@2x.png'
  
    };
    if ((this.clima.icon) = '50d') {
      return 'https://openweathermap.org/img/wn/50d@2x.png'
    
    };
    if ((this.clima.icon) = '01n') {
      return 'https://openweathermap.org/img/wn/10n@2x.png'

    };

    if ((this.clima.icon) = '02n') {
      return 'https://openweathermap.org/img/wn/02n@2x.png'
 
    };
    if ((this.clima.icon) = '03n') {
      return 'https://openweathermap.org/img/wn/03n@2x.png'
  
    };
    if ((this.clima.icon) = '04n') {
      return 'https://openweathermap.org/img/wn/04n@2x.png'
   
    };
    if ((this.clima.icon) = '09n') {
      return 'https://openweathermap.org/img/wn/09n@2x.png'
   
    };
    if ((this.clima.icon) = '10n') {
      return'https://openweathermap.org/img/wn/10n@2x.png'
  
    };
    if ((this.clima.icon) = '11n') {
      return 'https://openweathermap.org/img/wn/11n@2x.png'
   
    };
    if ((this.clima.icon) = '13n') {
      return 'https://openweathermap.org/img/wn/13n@2x.png'
    
    };
    if ((this.clima.icon) = '50n') {
      return 'https://openweathermap.org/img/wn/50n@2x.png'
     
    };

  }


  getWeather(ciudad: string, codigo: string) {
    codigo = 'Ar';

    this.weatherService.getWeather(ciudad, codigo)
      .subscribe(
        res => {
          console.log(res);
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

  // Listado:lista[] = [
  //   {nombre:"Basavilbaso"},
  //   {nombre:"Brazo Largo"},
  //   {nombre:"Caseros"},
  //   {nombre:"Cerrito"},
  //   {nombre:"Chajarí"},
  //   {nombre:"Colón"},
  //   {nombre:"C. del Uruguay"},
  //   {nombre:"Concordia"},
  //   {nombre:"Crespo"},
  //   {nombre:"Diamante"},
  //   {nombre:"Federación"},
  //   {nombre:"Federal"},
  //   {nombre:"Feliciano"},
  //   {nombre:"General Ramirez"},
  //   {nombre:"General Campos"},
  //   {nombre:"Gualeguay"},
  //   {nombre:"Gualeguaychú"},
  //   {nombre:"Hernandarias"},
  //   {nombre:"Ibicuy"},
  //   {nombre:"La Paz"},
  //   {nombre:"Larroque"},
  //   {nombre:"Lib. San Martín"},
  //   {nombre:"Liebig"},
  //   {nombre:"Lucas González"},
  //   {nombre:"María Grande"},
  //   {nombre:"Nogoyá"},
  //   {nombre:"Oro Verde"},
  //   {nombre:"Paraná"},
  //   {nombre:"Piedras Blancas"},
  //   {nombre:"Pueblo Belgrano"},
  //   {nombre:"Pueblo Brugo"},
  //   {nombre:"Puerto Alvear"},
  //   {nombre:"Puerto Yeruá"},
  //   {nombre:"Rosario del Tala"},
  //   {nombre:"San José"},
  //   {nombre:"San Salvador"},
  //   {nombre:"Santa Ana"},
  //   {nombre:"Santa Elena"},
  //   {nombre:"Ubajay"},
  //   {nombre:"Urdinarrain"},
  //   {nombre:"Valle María"},
  //   {nombre:"Viale"},
  //   {nombre:"Victoria"},
  //   {nombre:"Villa Elisa"},
  //   {nombre:"Villa Paranacito"},
  //   {nombre:"Villa Urquiza"},
  //   {nombre:"Villaguay"}
  // ]
}

// interface lista {
//   nombre: string;
// }
