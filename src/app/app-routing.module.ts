import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  GenSelcourseComponent
} from './gen-selcourse/gen-selcourse.component';

import {
  GenProfileComponent
} from './gen-profile/gen-profile.component';

const routes: Routes = [
  /*{
    path: '',
    redirectTo: '/select-course',
    pathMatch: 'full'
  },*/
  {
    path: 'select-course',
    component: GenSelcourseComponent
  },
  {
    path: 'general-profile',
    component: GenProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
