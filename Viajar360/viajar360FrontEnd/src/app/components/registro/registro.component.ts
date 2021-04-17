import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ConfirmedValidator} from './registro.validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private fb: FormBuilder) { }


  user: FormGroup;

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email] ),
    }), {
      validator: ConfirmedValidator('password', 'confirmpassword')
    }


  };

  get f() {
    return this.user.controls;
  }

  submit() {
    console.log(this.user.value);
  }
}