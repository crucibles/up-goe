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
  CollapseModule
} from 'ngx-bootstrap/collapse/collapse.module';

import {
  AccordionModule,
  ModalModule,
  PopoverModule,
  ProgressbarModule,
  TooltipModule,
  TimepickerModule
} from 'ngx-bootstrap';

//Application Imports
import {
  BadgeModal,
  PageNotFoundComponent,
  SortableColumnComponent,
  SortableTableDirective
} from 'shared/pages';



@NgModule({
  imports: [
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  exports: [
    CollapseModule,
    CommonModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    PopoverModule,
    ProgressbarModule,
    ReactiveFormsModule,
    TimepickerModule,
    TooltipModule,
    BadgeModal,
    SortableColumnComponent,
    SortableTableDirective
  ],
  declarations: [
    SortableColumnComponent,
    SortableTableDirective,
    PageNotFoundComponent,
    BadgeModal
  ]
})
export class SharedModule { }
