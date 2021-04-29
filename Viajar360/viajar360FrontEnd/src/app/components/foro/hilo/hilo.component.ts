import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hilo',
  templateUrl: './hilo.component.html',
  styleUrls: ['./hilo.component.css']
})
export class HiloComponent implements OnInit {

  constructor(public actRoute: ActivatedRoute) { }
  id = this.actRoute.snapshot.params['id'];

  ngOnInit(): void {
  }

}
