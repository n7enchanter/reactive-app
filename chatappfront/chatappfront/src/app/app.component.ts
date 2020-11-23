import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatappfront';
  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }
  logout() {
    localStorage.removeItem('Authentication');
  }
}
