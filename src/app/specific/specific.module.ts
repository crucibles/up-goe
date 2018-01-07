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
} from 'specific/pages';

import {
  SpecificComponent
} from 'specific/specific.component';

import {
  SpecificRoutingModule
} from 'specific/specific-routing.module';

import {
  SpecificSidetabComponent
} from 'app/specific';

import {
  SpecificTopnavbarComponent
} from 'app/specific';



@NgModule({
  imports: [
    SharedModule,
    SpecificRoutingModule
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
