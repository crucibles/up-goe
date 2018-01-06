//Core Imports 
import {
  NgModule
} from '@angular/core';

//Application Imports
import {
  SharedModule
} from 'shared/shared.module';

import {
  SpecificNewsComponent,
  SpecificProfileComponent
} from 'specific/pages';

import {
  SpecificComponent
} from 'specific/specific.component';

import {
  SpecificRoutingModule
} from 'specific/specific-routing.module';

import {
  SpecificTopnavbarComponent
} from 'app/specific';


@NgModule({
  imports: [
    SharedModule,
    SpecificRoutingModule
  ],
  declarations: [
    SpecificComponent,
    SpecificNewsComponent,
    SpecificProfileComponent,
    SpecificTopnavbarComponent
  ]
})
export class SpecificModule { }
