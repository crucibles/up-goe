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
} from 'angular-in-memory-web-api';*/


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
  GenNewsComponent,
  GenProfileComponent,
  GenSelcourseComponent,
  GenSidetabComponent,
  GenTopnavbarComponent
} from './general'

import { 
 LogInComponent 
} from './log-in/log-in.component';

import {
  BadgeService,
  CommentPostService,
  ItemService, 
  QuestService,
  SectionService,
  UserService
} from './shared/services';

//AHJ: remove after server is working
/*import {
  InMemoryDataService
} from './shared/services';*/

import {
  SignUpComponent
} from './sign-up/sign-up.component';

import {
  SpecificNewsComponent
} from './specific';


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
