//Core Imports
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  HttpClientModule
} from '@angular/common/http';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  Routes,
  RouterModule
} from '@angular/router';

//Third-Party Imports
import {
  ChartsModule
} from 'ng2-charts';

//Application Imports
import {
  GenSelcourseComponent,
  GenNewsComponent,
  GenProfileComponent
} from 'general/pages';

import {
  GeneralComponent
} from 'general/general.component';

import {
  GenTopnavbarComponent,
  GenSidetabComponent
} from 'general/index';

import {
  GeneralRoutingModule
} from 'general/general-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GeneralRoutingModule
  ],
  declarations: [
    GeneralComponent,
    GenSidetabComponent,
    GenNewsComponent,
    GenProfileComponent,
    GenTopnavbarComponent,
    GenSelcourseComponent
  ],
  bootstrap: [
    GeneralComponent
  ]
})
export class GeneralModule { }