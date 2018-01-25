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
} from 'student/specific/specific.component';

import {
  SpecificCharacterComponent,
  SpecificMyCourseComponent,
  SpecificNewsComponent, 
  SpecificProfileComponent,
  SpecificQuestMapComponent
} from 'student/specific/pages';

const specificRoutes: Routes = [

  {
    path: '',
    component: SpecificComponent,
    children: [
      {
        path: 'specific-character/:sectionId',
        component: SpecificCharacterComponent
      },
      {
        path: 'specific-news/:sectionId',
        component: SpecificNewsComponent
      },
      {
        path: 'specific-my-course/:sectionId',
        component: SpecificMyCourseComponent
      },
      {
        path: 'specific-profile/:sectionId',
        component: SpecificProfileComponent
      },
      {
        path: 'specific-quest-map/:sectionId',
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
