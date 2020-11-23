import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: String = 'http://localhost:8080/';
  constructor(private _http: HttpClient) { }
  form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  register(user: User) {
    return this._http.post(this.url + 'register', user);
  }
  login(user: User) {
    return this._http.post(this.url + 'login', user);
  }
  
}
