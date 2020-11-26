import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatappfront';
  userName:string = atob(this.localStorageItem('Authentication').split(' ')[1]).split(':')[0];
  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }
  logout() {
    localStorage.removeItem('Authentication');
  }
  
}
