import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import {UploaderService} from '../../services/uploader.service';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  file: File;

  imageUrl: string | ArrayBuffer =
    "https://bulma.io/images/placeholders/480x480.png";
  fileName: string = "No file selected";

  constructor(private uploader: UploaderService) { }
  user: FormGroup;

  ngOnInit(): void {
    this.user = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      foto: null,
    }),
    this.uploader.progressSource.subscribe(progress => {
      this.progress = progress;
    });
  }

  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }

  onUpload() {
    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;

    this.uploader.upload(this.file).subscribe(message => {
      this.isUploading = false;
      this.infoMessage = message;
    });
  }
}
