//Core Imports
import {
  CommonModule
} from '@angular/common';

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

//Third-Party Imports
import {
  ChartsModule
} from 'ng2-charts';

//Application Imports
import {
  PageNotFoundComponent
} from 'shared/pages';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [PageNotFoundComponent]
})
export class SharedModule { }
