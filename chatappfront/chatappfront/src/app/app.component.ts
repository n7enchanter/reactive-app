import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatappfront';
  userName:string = this.decript();
  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }

  public decript(){
    if(!!this.localStorageItem('Authentication')){
      return atob(this.localStorageItem('Authentication').split(' ')[1]).split(':')[0];
    } else {
      return ''
    }
  }
  setUserName(userName: string){
    this.userName = userName;
  }
  logout() {
    localStorage.removeItem('Authentication');
  }
  
}
