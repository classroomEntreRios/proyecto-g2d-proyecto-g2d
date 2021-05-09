import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  constructor(public actRoute: ActivatedRoute, public LG: LoginService, public router:Router) { }
  tmp="";
  dir=7;
  ngOnInit(): void {
    this.LG.ConnectToken().subscribe(data => {
      if(!data.respuesta || !data.flag){
        if(data.invalido){
          this.router.navigate(['/salida'])
        }
        this.router.navigate(['/'])
      }
    })
    this.tmp = this.actRoute.snapshot.params['dir'];
    if(this.tmp!="" && this.EsNumero(this.tmp)){
      this.dir = Number(this.tmp);
    }
    console.log(this.dir);
  }

  // switchNgBTab(id: string) {
  //  this.Tabs.activeId(id);
  // }
  EsNumero(variable: string) {
    if(isNaN(Number(variable))){
      return false;
    }
    else
    {
      return true;
    }
  }
}
