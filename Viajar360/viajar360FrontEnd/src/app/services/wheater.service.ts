import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class WheaterService {
  apiKey = 'f6991307689d553dbf65f319b8453666';
URI: string="";
  constructor(private http: HttpClient) { 
    
    this.URI = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=`
  }
  

  getWeather(ciudad:string, codigo: string) {
    
    return this.http.get(`${this.URI}${ciudad},${codigo}`)
  }

  GetLocation(ciudad:string){
    return this.http.get("https://api.openweathermap.org/geo/1.0/direct?q="+ciudad+",ar&limit=1&appid="+this.apiKey);
  }

  GetForecast(entrada: any){
    return this.http.get("https://api.openweathermap.org/data/2.5/onecall?lat="+entrada.lat+"&lon="+entrada.lon+"&exclude=current,minutely,hourly,alerts&units=metric&appid="+this.apiKey);
  }
  
}
