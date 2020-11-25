import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Message } from '../model/Message'
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  message: string;
  roomId: string;
  constructor(private messageService:MessagesService,private cdr: ChangeDetectorRef,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }
  getMessages(roomId:string){
    this.messageService.closeEvent();
    this.messages = [];
    this.roomId = roomId;
    this.messageService.getMessages(roomId).subscribe(message => {
        this.messages.push(message);
        this.cdr.detectChanges();
    })

  }
  sendMessage(){
    let username = atob(localStorage.getItem('Authentication').split(' ')[1]).split(':')[0];
    this.messageService.postMessage(new Message(username,this.message,this.roomId)).subscribe();
    this.message = '';
  }

}
