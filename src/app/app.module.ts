import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GenSelcourseComponent } from './gen-selcourse/gen-selcourse.component';
import { UserService } from './user.service'
import { FormsModule } from '@angular/forms';
import { GenProfileComponent } from './gen-profile/gen-profile.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    GenSelcourseComponent,
    GenProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
