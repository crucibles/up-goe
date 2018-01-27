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
  PageNotFoundComponent
} from 'shared/pages';

import {
  GeneralComponent
} from 'teacher/general/general.component';

import {
  GenProfileComponent,
  GenSelcourseComponent
} from 'teacher/general/pages';

const generalRoutes: Routes = [

  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: 'select-course',
        component: GenSelcourseComponent
      },
      {
        path: 'general-profile',
        component: GenProfileComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(generalRoutes)],
  exports: [RouterModule]
})

export class GeneralRoutingModule { }