import {
  NgModule
} from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

//Application Imports
import {
  SpecificComponent
} from 'specific/specific.component';

import {
  SpecificNewsComponent
} from 'specific/pages';

const generalRoutes: Routes = [

  {
    path: '',
    component: SpecificComponent,
    children: [
      {
        path: 'specific-news',
        component: SpecificNewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(generalRoutes)],
  exports: [RouterModule]
})

export class SpecificRoutingModule { }
