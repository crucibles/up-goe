import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GenSelcourseComponent } from './gen-selcourse/gen-selcourse.component';
import { UserService } from './user.service'
import { Accordion } from './accordion'
import { FormsModule } from '@angular/forms';
import { GenProfileComponent } from './gen-profile/gen-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    GenSelcourseComponent,
    Accordion,
    GenProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
