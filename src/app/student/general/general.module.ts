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
  GenProfileComponent,
  GenAchievementsComponent,
  AboutUsComponent
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

import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  imports: [
    SharedModule,
    GeneralRoutingModule
  ],
  declarations: [
    AboutUsComponent,
    GeneralComponent,
    GenSidetabComponent,
    GenAchievementsComponent,
    GenNewsComponent,
    GenProfileComponent,
    GenTopnavbarComponent,
    GenSelcourseComponent,
		FileSelectDirective
  ],
  bootstrap: [
    GeneralComponent
  ]
})
export class GeneralModule { }