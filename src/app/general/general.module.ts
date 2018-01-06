//Core Imports
import {
  NgModule
} from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

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

import {
  SharedModule
} from 'shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse/collapse.module';

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