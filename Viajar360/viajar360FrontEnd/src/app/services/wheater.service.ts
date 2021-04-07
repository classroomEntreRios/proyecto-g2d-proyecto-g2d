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
    
    this.URI = `http://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=`
  }

  getWeather(ciudad:string, codigo: string) {
    
    return this.http.get(`${this.URI}${ciudad},${codigo}`)
  }
}
