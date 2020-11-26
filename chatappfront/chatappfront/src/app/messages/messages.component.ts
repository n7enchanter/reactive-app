import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Message } from '../model/Message'
import { Room } from '../model/room';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollframe', { static: false, read: ElementRef }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  userName:string = atob(localStorage.getItem('Authentication').split(' ')[1]).split(':')[0];
  messages: Message[] = [];
  message: string;
  roomId: string;
  roomName: string;
  scrollContainer: any;
  isNearBottom: boolean = true;
  constructor(private messageService: MessagesService, private cdr: ChangeDetectorRef, private authenticationService: AuthenticationService) { }
  ngAfterViewInit(): void {

    this.scrollContainer = this.scrollFrame.nativeElement;
    this.scrollToBottom();
    this.itemElements.changes.subscribe(a => this.onItemElementsChanged());
  }

  ngOnInit(): void {

  }
  scrolled(event: any): void {
    debugger;
    this.isNearBottom = this.isUserNearBottom();
  }


  onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
  private isUserNearBottom(): boolean {
    debugger;
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }
  getMessages(rD: Room) {
    this.messageService.closeEvent();
    this.messages = [];
    this.roomId = rD.roomId.toString();
    this.roomName = rD.roomName;
    this.messageService.getMessages(rD.roomId.toString()).subscribe(message => {
      this.messages.push(message);
      this.cdr.detectChanges();
    })

  }
  sendMessage() {
    let username = atob(localStorage.getItem('Authentication').split(' ')[1]).split(':')[0];
    this.messageService.postMessage(new Message(username, this.message, this.roomId)).subscribe();
    this.message = '';
  }

}
