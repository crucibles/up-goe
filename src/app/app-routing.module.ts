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
    path: 'general',
    loadChildren: './general/general.module#GeneralModule'
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
    path: 'specific',
    loadChildren: './specific/specific.module#SpecificModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
