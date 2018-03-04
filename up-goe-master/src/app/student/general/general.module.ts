//Core Imports
import {
  NgModule
} from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

//Third-Party Imports
import {
  CollapseModule
} from 'ngx-bootstrap/collapse/collapse.module';

//Application Imports
import {
  GenSelcourseComponent,
  GenNewsComponent,
  GenProfileComponent
} from 'student/general/pages';

import {
  GeneralComponent
} from 'student/general/general.component';

import {
  GenTopnavbarComponent,
  GenSidetabComponent
} from 'student/general/index';

import {
  GeneralRoutingModule
} from 'student/general/general-routing.module';

import {
  SharedModule
} from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
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