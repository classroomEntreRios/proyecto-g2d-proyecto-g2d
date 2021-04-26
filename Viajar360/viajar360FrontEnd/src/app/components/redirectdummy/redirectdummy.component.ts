import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirectdummy',
  templateUrl: './redirectdummy.component.html',
  styleUrls: ['./redirectdummy.component.css']
})
export class RedirectdummyComponent implements OnInit {

  constructor(public router: Router, public actRoute: ActivatedRoute,) { }
  tmp=''
  ngOnInit(): void {
    this.tmp="/admin-dashboard/2/"+this.actRoute.snapshot.params['id'];
    this.router.navigate([this.tmp]);
  }

}
