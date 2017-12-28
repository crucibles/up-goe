//Core Imports
import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  HttpClientModule
} from '@angular/common/http';

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

import {
  QuestService
} from './quest.service';

import {
  SectionService
} from './section.service';

import {
  UserService
} from './user.service';

//AHJ: remove after server is working
import {
  InMemoryDataService
} from './in-memory-data.service';
import { SpecificNewsComponent } from './specific-news/specific-news.component';


@NgModule({
  declarations: [
    AppComponent,
    GenSelcourseComponent,
    GenProfileComponent,
    GenTopnavbarComponent,
    GenSidetabComponent,
    GenNewsComponent,
    SpecificNewsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    CommentPostService,
    QuestService,
    SectionService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
