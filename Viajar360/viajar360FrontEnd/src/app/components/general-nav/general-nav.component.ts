import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-nav',
  templateUrl: './general-nav.component.html',
  styleUrls: ['./general-nav.component.css']
})
export class GeneralNavComponent implements OnInit {


  public isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
