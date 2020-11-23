import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
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

  getMessages(roomId:string){
    this.ClickEvent.emit(roomId);
  }

  getUsers(): void {
    debugger;
    this.users = [];
    let quoteObservable: Observable<String>;
    quoteObservable = this.roomsService.getUsers();
    
    quoteObservable.subscribe(user => {
      this.users.push(user);
      this.cdr.detectChanges();
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
      debugger;
      this.newUser = new User(user,"null")
      this.roomsService.createRoom(this.newUser).subscribe();
    }
  }
  getRooms():void{
    debugger;
    let quoteObservable: Observable<Room>;
    quoteObservable = this.roomsService.getRooms();
    
    quoteObservable.subscribe(room => {
      if(room.privateChat === 'false'){
        this.rooms.push(new Chat(room.id,'Public Chat',room.privateChat))
      } else {
        this.rooms.push(new Chat(room.id,room.contributors[0].replace('"','').replace('"',''),room.privateChat));
      }
      this.cdr.detectChanges();
      // this.cdr.detectChanges();
    });
  }

}
