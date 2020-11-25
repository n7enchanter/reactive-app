import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';
import { Observable } from 'rxjs';
import { Message } from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  eventSource:EventSourcePolyfill;
  constructor(private _http:HttpClient) { }
  url: String = 'http://localhost:8080/';
  getMessages(roomId:string): Observable<Message> {
    return new Observable<Message>((observer) => {
      let url = this.url+'getMessages/'+roomId;
      this.eventSource = new EventSourcePolyfill(url,{
        headers: {
          'Authorization': localStorage.getItem('Authentication')
        }});
      this.eventSource.onmessage = (event) => {
        console.debug('Received event: ', event);
        let json = JSON.parse(event.data);
        observer.next(new Message(json['sender'],json['message'],json['roomId']));
      };
      this.eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way 
        // of detecting the end of the stream is to insert a special element
        // in the stream of events, which the client can identify as the last one.
        if(this.eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          this.eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }
    });
  }
  postMessage(message: Message){
    return this._http.post(this.url+'postMessage',message);
  }


  closeEvent(){
    if(this.eventSource){
      this.eventSource.close();
    }
  }
}
