//Core Imports
import {
	NgModule
} from '@angular/core';

//Application Imports
import {
	GeneralComponent
} from './general.component';

import {
	GeneralRoutingModule
} from './general-routing.module';

import {
	SharedModule
} from 'shared/shared.module';

import {
	GenSidetabComponent,
	GenTopnavbarComponent
} from 'teacher/general';

import {
	CreateCourseComponent,
	GenProfileComponent,
	GenSelcourseComponent,
	InventoryComponent
} from 'teacher/general/pages';

@NgModule({
	imports: [
		SharedModule,
		GeneralRoutingModule
	],
	declarations: [
		CreateCourseComponent,
		GeneralComponent,
		GenSidetabComponent,
		GenSelcourseComponent,
		GenTopnavbarComponent,
		GenProfileComponent,
		InventoryComponent
	]
})
export class GeneralModule { }
