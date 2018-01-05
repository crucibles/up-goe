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
  GenNewsComponent,
  GenProfileComponent,
  GenSelcourseComponent
} from 'general/pages';

import {
  LogInComponent
} from 'log-in/log-in.component';

import {
  SignUpComponent
} from 'sign-up/sign-up.component';

import {
  SpecificNewsComponent
} from 'specific/pages';



const routes: Routes = [
  {
    path: '', 
    redirectTo: '/log-in', 
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: '',
    redirectTo: '/log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: 'sign-up',
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
