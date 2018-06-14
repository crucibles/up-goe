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

import { 
  AuthGuardService 
} from 'shared/services/auth-guard.service';

import { 
  GeneralComponent 
} from 'student/general/general.component';

import { 
  GenSelcourseComponent 
} from 'student/general/pages';

const specificRoutes: Routes = [

  {
    path: '',
    component: SpecificComponent,
    children: [
      {
        path: 'specific-profile/',
        loadChildren: 'student/general/general.module#GeneralModule',
        component: GenSelcourseComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'specific-news/',
        component: GenSelcourseComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'specific-my-course/',
        component: GenSelcourseComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'specific-quest-map/',
        component: GenSelcourseComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'specific-character/:sectionId',
        component: SpecificCharacterComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'specific-news/:sectionId',
        component: SpecificNewsComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'specific-my-course/:sectionId',
        component: SpecificMyCourseComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'specific-profile/:sectionId',
        component: SpecificProfileComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'specific-quest-map/:sectionId',
        component: SpecificQuestMapComponent,
        canActivate: [AuthGuardService] 
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
