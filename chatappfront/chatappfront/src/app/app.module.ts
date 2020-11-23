import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesComponent } from './messages/messages.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BasicAuthInterceptorService } from './interceptor/basic-auth-interceptor.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select'
import {MatSelectModule} from '@angular/material/select'
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AuthenticationComponent } from './authentication/authentication.component'
import { AuthenticationService } from './authentication/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    RoomsComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule,
    MatSelectModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true },AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
