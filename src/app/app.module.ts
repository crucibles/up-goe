import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GenSelcourseComponent } from './gen-selcourse/gen-selcourse.component';

@NgModule({
  declarations: [
    AppComponent,
    GenSelcourseComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
