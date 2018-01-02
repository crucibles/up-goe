<<<<<<< HEAD
//Core Imports
import {
  HttpClientModule
} from '@angular/common/http';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  BrowserModule
} from '@angular/platform-browser';

//AHJ: remove after server is available
/*import {
  HttpClientInMemoryWebApiModule
} from 'angular-in-memory-web-api';
*/
//Third-Party Imports
import {
  ChartsModule
} from 'ng2-charts';

//Application Imports
import {
  AppComponent
} from './app.component';

import {
  AppRoutingModule
} from './app-routing.module';

import {
  BadgeService
} from './badge.service';

import {
  CommentPostService
} from './comment-post.service';

import {
  GenNewsComponent
} from './gen-news/gen-news.component';

import {
  GenProfileComponent
} from './gen-profile/gen-profile.component';

import {
  GenSelcourseComponent
} from './gen-selcourse/gen-selcourse.component';

import {
  GenSidetabComponent
} from './gen-sidetab/gen-sidetab.component';

import {
  GenTopnavbarComponent
} from './gen-topnavbar/gen-topnavbar.component';

//AHJ: remove after server is working
import {
  InMemoryDataService
} from './in-memory-data.service';

import {
  QuestService
} from './quest.service';

import {
  SectionService
} from './section.service';

import {
  SignUpComponent
} from './sign-up/sign-up.component';

import {
  SpecificNewsComponent
} from './specific-news/specific-news.component';

import {
  UserService
} from './user.service';
import { ItemService } from './item.service';


@NgModule({
  declarations: [
    AppComponent,
    GenSelcourseComponent,
    GenProfileComponent,
    GenTopnavbarComponent,
    GenSidetabComponent,
    GenNewsComponent,
    SpecificNewsComponent,
    SignUpComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    /*HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )*/
  ],
  providers: [
    BadgeService,
    CommentPostService,
    QuestService,
    SectionService,
    UserService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
=======
//Core Imports
import {
  HttpClientModule
} from '@angular/common/http';

import {
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  BrowserModule
} from '@angular/platform-browser';

//AHJ: remove after server is available
import {
  HttpClientInMemoryWebApiModule
} from 'angular-in-memory-web-api';

//Third-Party Imports
import {
  ChartsModule
} from 'ng2-charts';

//Application Imports
import {
  AppComponent
} from './app.component';

import {
  AppRoutingModule
} from './app-routing.module';

import {
  BadgeService
} from './badge.service';

import {
  CommentPostService
} from './comment-post.service';

import {
  GenNewsComponent
} from './gen-news/gen-news.component';

import {
  GenProfileComponent
} from './gen-profile/gen-profile.component';

import {
  GenSelcourseComponent
} from './gen-selcourse/gen-selcourse.component';

import {
  GenSidetabComponent
} from './gen-sidetab/gen-sidetab.component';

import {
  GenTopnavbarComponent
} from './gen-topnavbar/gen-topnavbar.component';

//AHJ: remove after server is working
import {
  InMemoryDataService
} from './in-memory-data.service';

import {
  QuestService
} from './quest.service';

import {
  SectionService
} from './section.service';

import {
  SignUpComponent
} from './sign-up/sign-up.component';

import {
  SpecificNewsComponent
} from './specific-news/specific-news.component';

import {
  UserService
} from './user.service';
import { ItemService } from './item.service';
import { LogInComponent } from './log-in/log-in.component';


@NgModule({
  declarations: [
    AppComponent,
    GenSelcourseComponent,
    GenProfileComponent,
    GenTopnavbarComponent,
    GenSidetabComponent,
    GenNewsComponent,
    SpecificNewsComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    BadgeService,
    CommentPostService,
    QuestService,
    SectionService,
    UserService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> 4be53e92d9270478f002b71cc1a3c34ebfe304de
