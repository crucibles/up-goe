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

//Third-party Imports
import {
  ChartsModule
} from 'ng2-charts';

//Application Imports
import {
  SpecificNewsComponent
} from 'specific/pages';
import {
  SpecificComponent
} from 'specific/specific.component';

import {
  SpecificRoutingModule
} from 'specific/specific-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SpecificRoutingModule
  ],
  declarations: [
    SpecificComponent,
    SpecificNewsComponent
  ]
})
export class SpecificModule { }
