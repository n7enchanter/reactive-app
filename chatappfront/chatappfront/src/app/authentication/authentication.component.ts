import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {User} from '../model/User';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  @Output() UserNameEmiter = new EventEmitter();
  user:User ;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( public authenticationService: AuthenticationService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  alertMessage(message: string,action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  login(){
    this.user = new User(this.authenticationService.form.value.username,this.authenticationService.form.value.password);
    this.authenticationService.login(this.user).subscribe(username => {
      if(username['username']!==null){
        localStorage.setItem('Authentication', 'Basic '+btoa(this.user.username+':'+this.user.password));
        this.UserNameEmiter.emit(this.user.username);
      } else {
        this.alertMessage('Invalid credentials','');
      }
    });
  }
  register(){
    if(!this.authenticationService.form.value.username||!this.authenticationService.form.value.password){
      this.alertMessage('Username and password are mandatory ','Enter username and password');
      return
    }
    this.user = new User(this.authenticationService.form.value.username,this.authenticationService.form.value.password);
    this.authenticationService.register(this.user).pipe().subscribe(newUser => {
      if(newUser['username'] !== null){
        this.alertMessage('User with this username exists','Provide uniqe username');
      } else{
        this.alertMessage('User registered ','Please log in');
      }
    })
  }

}
