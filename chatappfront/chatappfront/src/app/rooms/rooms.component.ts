import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable, interval } from 'rxjs';
import { RoomsService } from './rooms.service';
import {Chat,Room} from '../model/room'
import { User } from '../model/User';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  constructor(private roomsService: RoomsService,private cdr: ChangeDetectorRef) { }
  rooms: Chat[]=[];
  users: String[] = [];
  newUser: User;
  @Output() ClickEvent = new EventEmitter();
  @ViewChild('mySelect') mySelect:MatSelect;  
  selected : String;
  ngOnInit(): void {
    this.getUsers();
    this.getRooms();
  }


  getMessageStream(roomId:string){
    debugger;
    this.ClickEvent.emit(roomId);
  }

  getUsers(): void {
    this.users = [];
    
    this.roomsService.getUsers().subscribe(user => {
      if(user.toString()!== atob(localStorage.getItem('Authentication').split(' ')[1]).split(':')[0]){
        this.users.push(user);
        this.cdr.detectChanges();
      }
    });
  }

  createRoom(user:string):void{
    let exists:Boolean = false;
    if(this.rooms){
      this.rooms.forEach(room => {
        if(room.contributor === user.toString()){
          exists=true;
        }
      });
    }
    if(!exists){
      this.newUser = new User(user,"null")
      this.roomsService.createRoom(this.newUser).subscribe();
    }
  }
   source = interval(80000).subscribe(x =>{
      this.getRooms();
   })

  getRooms():void{
    this.roomsService.closeEvent();
    let quoteObservable: Observable<Room>;
    quoteObservable = this.roomsService.getRooms();
    
    quoteObservable.subscribe(room => {
      if(this.rooms.indexOf)
      if(room.privateChat === 'false'){
        let chat = new Chat(room.roomId,'Public Chat',room.privateChat,'Public Chat');
        if(!this.rooms.find(c => chat.contributor === c.contributor)){
          this.rooms.push(chat)
        }
      } else {
        let chat = new Chat(room.roomId,room.contributors[0],room.privateChat,room.roomName);
        if(!this.rooms.find(c => chat.contributor === c.contributor)){
          this.rooms.push(chat)
        }
      }
      this.cdr.detectChanges();
      // this.cdr.detectChanges();
    });
  }

}
