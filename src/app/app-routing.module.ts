//Core Imports
import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

//Application Imports
import {
  GenNewsComponent
} from './gen-news/gen-news.component';

import {
  GenProfileComponent
} from './gen-profile/gen-profile.component';

import {
  GenSelcourseComponent
} from './gen-selcourse/gen-selcourse.component';

import {
  SignUpComponent
} from './sign-up/sign-up.component';

import {
  SpecificNewsComponent
} from './specific-news/specific-news.component';


const routes: Routes = [
  /*{
    path: '',
    redirectTo: '/select-course',
    pathMatch: 'full'
  },*/
  {
    path: '',
    component: SignUpComponent
  },
  {
    path: 'select-course',
    component: GenSelcourseComponent
  },
  {
    path: 'general-news',
    component: GenNewsComponent
  },
  {
    path: 'general-profile',
    component: GenProfileComponent
  },
  {
    path: 'specific-news/:section_id',
    component: SpecificNewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
