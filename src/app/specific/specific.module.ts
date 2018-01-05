//Core Imports 
import {
  NgModule
} from '@angular/core';

//Application Imports
import {
  SharedModule
} from 'shared/shared.module';

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
    SharedModule,
    SpecificRoutingModule
  ],
  declarations: [
    SpecificComponent,
    SpecificNewsComponent
  ]
})
export class SpecificModule { }
