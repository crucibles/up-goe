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
  GenProfileComponent
} from './gen-profile/gen-profile.component';

import {
  GenSelcourseComponent
} from './gen-selcourse/gen-selcourse.component';

import {
  GenTopnavbarComponent
} from './gen-topnavbar/gen-topnavbar.component';

import {
  UserService
} from './user.service';
import { GenSidetabComponent } from './gen-sidetab/gen-sidetab.component';

@NgModule({
  declarations: [
    AppComponent,
    GenSelcourseComponent,
    GenProfileComponent,
    GenTopnavbarComponent,
    GenSidetabComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
