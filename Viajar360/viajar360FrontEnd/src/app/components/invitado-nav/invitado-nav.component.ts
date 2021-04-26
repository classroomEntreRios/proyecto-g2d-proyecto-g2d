import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitado-nav',
  templateUrl: './invitado-nav.component.html',
  styleUrls: ['./invitado-nav.component.css']
})
export class InvitadoNavComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
