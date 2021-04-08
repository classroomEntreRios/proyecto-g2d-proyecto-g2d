import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrado-nav',
  templateUrl: './registrado-nav.component.html',
  styleUrls: ['./registrado-nav.component.css']
})
export class RegistradoNavComponent implements OnInit {

  public isMenuCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
