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
  AuthGuardService 
} from 'shared/services/auth-guard.service';

import {
  ChangePasswordComponent
} from './change-password/change-password.component';

import {
  LogInComponent
} from 'log-in/log-in.component';

import {
  PageNotFoundComponent
} from 'shared/pages';

import {
  SignUpComponent
} from 'sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/log-in',
    canActivate: [AuthGuardService], 
    pathMatch: 'full'
  },
  {
    path: 'student/general',
    loadChildren: 'student/general/general.module#GeneralModule',
    canActivate: [AuthGuardService], 
  },
  {
    path: 'teacher/general',
    loadChildren: 'teacher/general/general.module#GeneralModule',
    canActivate: [AuthGuardService], 
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
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'student/specific',
    loadChildren: 'student/specific/specific.module#SpecificModule',
    canActivate: [AuthGuardService] 
  },
  {
    path: 'teacher/specific',
    loadChildren: './teacher/specific/specific.module#SpecificModule',
    canActivate: [AuthGuardService] 
  },
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
