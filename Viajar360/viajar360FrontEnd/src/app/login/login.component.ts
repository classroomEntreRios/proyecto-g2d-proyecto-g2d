import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: new FormControl('',[Validators.required]),
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

}
