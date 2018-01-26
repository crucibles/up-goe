//Core Imports 
import {
  NgModule
} from '@angular/core';

//Application Imports
import {
  SharedModule
} from 'shared/shared.module';

import {
  SpecificCharacterComponent,
  SpecificMyCourseComponent,
  SpecificNewsComponent,
  SpecificProfileComponent,
  SpecificQuestMapComponent
} from 'student/specific/pages';

import {
  SpecificComponent
} from 'student/specific/specific.component';

import {
  SpecificRoutingModule
} from 'student/specific/specific-routing.module';

import {
  SpecificSidetabComponent,
  SpecificTopnavbarComponent
} from 'app/student/specific';


import { 
  GeneralRoutingModule 
} from 'student/general/general-routing.module';

import { 
  GeneralModule 
} from 'student/general/general.module';



@NgModule({
  imports: [
    SharedModule,
    SpecificRoutingModule,
    GeneralRoutingModule,
    GeneralModule
  ],
  declarations: [
    SpecificCharacterComponent,
    SpecificComponent,
    SpecificMyCourseComponent,
    SpecificNewsComponent,
    SpecificProfileComponent,
    SpecificQuestMapComponent,
    SpecificSidetabComponent,
    SpecificTopnavbarComponent
  ]
})
export class SpecificModule { }
