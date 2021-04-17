import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor() { }
  user: FormGroup;

  ngOnInit(): void {
    this.user = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      foto: null,
    }),

      this.user.get('foto').valueChanges.subscribe((value) => {
        if (value !== null && value !== '') {
          this.imgToBase64((document.querySelector('input[type="file"]') as HTMLInputElement).files[0]);
        }
      });
  }

  private imgToBase64(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = this.toBase64.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  toBase64(e) {
    console.log('data:image/png;base64,' + btoa(e.target.result));
  }
}

