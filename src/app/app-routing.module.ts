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
  LogInComponent
} from 'log-in/log-in.component';

import {
  PageNotFoundComponent
} from 'shared/pages';

import {
  SignUpComponent
} from 'sign-up/sign-up.component';

import { 
  AuthGuardService 
} from 'shared/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/log-in',
    canActivate: [AuthGuardService], 
    pathMatch: 'full'
  },
  {
    path: 'student/general',
    loadChildren: 'student/general/general.module#GeneralModule'
  },
  {
    path: 'teacher/general',
    loadChildren: 'teacher/general/general.module#GeneralModule'
  },
  {
    path: 'log-in',
    component: LogInComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'student/specific',
    loadChildren: 'student/specific/specific.module#SpecificModule'
  },
  /*{
    path: 'teacher/specific',
    loadChildren: './teacher/specific/specific.module#SpecificModule'
  },*/
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
