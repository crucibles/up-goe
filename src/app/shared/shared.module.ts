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

import {
  TooltipModule
} from 'ngx-bootstrap/tooltip';

//Application Imports
import {
  PageNotFoundComponent
} from 'shared/pages';
import { CollapseModule } from 'ngx-bootstrap/collapse/collapse.module';

@NgModule({
  imports: [
    CollapseModule.forRoot(),
    CommonModule,
    TooltipModule.forRoot()
  ],
  exports: [
    CollapseModule,
    CommonModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  declarations: [PageNotFoundComponent]
})
export class SharedModule { }
