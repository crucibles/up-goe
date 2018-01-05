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
} from 'general/pages';

import {
    GeneralComponent
} from 'general/general.component';

const generalRoutes: Routes = [

    {
        path: '',
        component: GeneralComponent,
        children: [
            {
                path: 'general-news',
                component: GenNewsComponent
            },
            {
                path: 'general-profile',
                component: GenProfileComponent
            },
            {
                path: 'select-course',
                component: GenSelcourseComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(generalRoutes)],
    exports: [RouterModule]
})

export class GeneralRoutingModule { }