//Core Imports
import {
  NgModule
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';

//Third-Party Imports
import {
  CookieService
} from 'ngx-cookie-service';

//Application Imports
import {
  AppComponent
} from './app.component';

import {
  AppRoutingModule
} from './app-routing.module';

import {
  LogInComponent
} from 'log-in/log-in.component';

import {
  BadgeService,
  CommentPostService,
  ItemService,
  PageService,
  QuestService,
  SectionService,
  UserService
} from 'shared/services';

import {
  SharedModule
} from './shared/shared.module';

import {
  SignUpComponent
} from 'sign-up/sign-up.component';

import { 
  AuthGuardService 
} from 'shared/services/auth-guard.service';

import { 
  AuthService 
} from 'shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
  ],
  providers: [
    BadgeService,
    CommentPostService,
    QuestService,
    PageService,
    SectionService,
    UserService,
    ItemService,
    CookieService,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
