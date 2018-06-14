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
  GenSelcourseComponent,
  InventoryComponent
} from 'teacher/general/pages';

import { AuthGuardService } from 'shared/services/auth-guard.service';

const generalRoutes: Routes = [

  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: 'select-course',
        component: GenSelcourseComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'general-profile',
        component: GenProfileComponent,
        canActivate: [AuthGuardService] 
      },
      {
        path: 'inventory',
        component: InventoryComponent,
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
  imports: [RouterModule.forChild(generalRoutes)],
  exports: [RouterModule]
})

export class GeneralRoutingModule { }