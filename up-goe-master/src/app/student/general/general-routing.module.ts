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
    GenSelcourseComponent,
    GenNewsComponent,
    GenProfileComponent
} from 'student/general/pages';

import {
    GeneralComponent
} from 'student/general/general.component';

import {
    PageNotFoundComponent
} from 'shared/pages';

import { 
    AuthGuardService
  } from 'shared/services/auth-guard.service';

const generalRoutes: Routes = [

    {
        path: '',
        component: GeneralComponent,
        children: [
            {
                path: 'general-news',
                component: GenNewsComponent,
                canActivate: [AuthGuardService] 
            },
            {
                path: 'general-profile',
                component: GenProfileComponent,
                canActivate: [AuthGuardService] 
            },
            {
                path: 'select-course',
                component: GenSelcourseComponent,
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