import { Component, OnInit } from '@angular/core';
import { GuidService } from './services/guid.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Viajar360FrontEnd';
  constructor(public guid: GuidService){}
  ngOnInit(){
    if(!this.guid.CheckIdentificacion()){
      this.guid.GenerarGuid().subscribe(data =>{
        this.guid.SetGUID(data.id);
      });
    }
  }
}
