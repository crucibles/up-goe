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
  SpecificComponent
} from 'specific/specific.component';

import {
  SpecificCharacterComponent,
  SpecificMyCourseComponent,
  SpecificNewsComponent, 
  SpecificProfileComponent,
  SpecificQuestMapComponent
} from 'specific/pages';

const specificRoutes: Routes = [

  {
    path: '',
    component: SpecificComponent,
    children: [
      {
        path: 'specific-character',
        component: SpecificCharacterComponent
      },
      {
        path: 'quest-map',
        component: SpecificQuestMapComponent
      },
      {
        path: 'specific-news',
        component: SpecificNewsComponent
      },
      {
        path: 'specific-my-course',
        component: SpecificMyCourseComponent
      },
      {
        path: 'specific-profile',
        component: SpecificProfileComponent
      },
      {
        path: 'specific-quest-map',
        component: SpecificQuestMapComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(specificRoutes)],
  exports: [RouterModule]
})

export class SpecificRoutingModule { }
