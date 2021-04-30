import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import * as io from 'socket.io-client';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  text = "";
  constructor(public chat: ChatService) {}
 

  ngOnInit(): void {
  
    
  }

  sendMessage(){
    let messageInfo = {
      text: this.text,
      messageType: 1
    };
    this.chat.sendMessage(messageInfo);
    this.text = "";
  }

}


