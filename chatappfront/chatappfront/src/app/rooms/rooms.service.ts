import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { EventSourcePolyfill } from 'ng-event-source';
import { Room } from '../model/room';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  eventSource:EventSourcePolyfill;
  constructor(private _http: HttpClient) {}
  url: String = 'http://localhost:8080/';
  getUsers(): Observable<String> {
    return new Observable<String>((observer) => {
      let url = this.url+'getUsers';
      let eventSource = new EventSourcePolyfill(url,{
        headers: {
          'Authorization': localStorage.getItem('Authentication')
        }});
      eventSource.onmessage = (event) => {
        console.debug('Received event: ', event);
        let json = event.data;
        let data = new String(json);
        observer.next(data);
      };
      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way 
        // of detecting the end of the stream is to insert a special element
        // in the stream of events, which the client can identify as the last one.
        if(eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }
    });
  }
  getRooms(): Observable<Room> {
    return new Observable<Room>((observer) => {
      let url = this.url+'getRooms';
      let eventSource = new EventSourcePolyfill(url,{
        headers: {
          'Authorization': localStorage.getItem('Authentication')
        }});
      eventSource.onmessage = (event) => {
        console.debug('Received event: ', event);
        let json = JSON.parse(event.data);
        observer.next(new Room(json['roomId'],json['contributors'],json['privatChat'],json['roomName']));
      };
      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way 
        // of detecting the end of the stream is to insert a special element
        // in the stream of events, which the client can identify as the last one.
        if(eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
        this.getRooms()
      }
    });
  }

  createRoom(user: User){
    return this._http.post(this.url+'createRoom',user);
  }

  setRoomName(roomDetails:Room){
    return this._http.post(this.url+'setRoomName',roomDetails);
  }
  closeEvent(){
    if(this.eventSource){
      this.eventSource.close();
    }
  }

}
