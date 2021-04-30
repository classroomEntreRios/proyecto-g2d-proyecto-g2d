import { Injectable } from '@angular/core';

const io = require("socket.io-client");


@Injectable({
  providedIn: 'root'
})
export class SocketService {
 io = io.connect("http://localhost:3000/", {
  
   autoConnect: true
  
 });    

  constructor() { }
}
