import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {User} from '../model/User';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  user:User ;

  constructor( public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login(){
    this.user = new User(this.authenticationService.form.value.username,this.authenticationService.form.value.password);
    this.authenticationService.login(this.user).subscribe(username => {
      if(username['username']!==null){
        localStorage.setItem('Authentication', 'Basic '+btoa(this.user.username+':'+this.user.password))
      }
    });
  }
  register(){
    this.user = new User(this.authenticationService.form.value.username,this.authenticationService.form.value.password);
    this.authenticationService.register(this.user).pipe().subscribe(newUser => {
      if(newUser['username'] === null){

      }
    })
  }

}
