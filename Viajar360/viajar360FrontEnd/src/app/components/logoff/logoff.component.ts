import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {

  constructor(public logueo: LoginService, public router: Router) { }

  ngOnInit(): void {
    this.logueo.LogOut();
    this.router.navigateByUrl('/')
  }
}
