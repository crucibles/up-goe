//Core Imports
import {
	BrowserModule
} from '@angular/platform-browser';

import {
	NgModule
} from '@angular/core';

//Third-Party Imports
import {
	CookieService
} from 'ngx-cookie-service';

//Application Imports
import {
	AlertService
} from 'shared/services/alert.service';

import {
	AppComponent
} from './app.component';

import {
	AppRoutingModule
} from './app-routing.module';

import {
	AuthGuardService
} from 'shared/services/auth-guard.service';

import {
	AuthService
} from 'shared/services/auth.service';

import {
	BadgeService,
	CommentPostService,
	ExperienceService,
	ItemService,
	PageService,
	QuestService,
	SectionService,
	UserService,
	LeaderboardService,
	FileService,
	SortService
} from 'shared/services';

import {
	BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
	ChangePasswordComponent
} from './change-password/change-password.component';

import {
	CustomOption
} from './toast-option'

import {
	LogInComponent
} from 'log-in/log-in.component';

import {
	SharedModule
} from './shared/shared.module';

import {
	SignUpComponent
} from 'sign-up/sign-up.component';

import {
	ToastModule,
	ToastOptions
} from 'ng2-toastr/ng2-toastr';



import { 
	AlertModule 
} from 'ngx-bootstrap';

@NgModule({
	declarations: [
		AppComponent,
		LogInComponent,
		SignUpComponent,
		ChangePasswordComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		SharedModule,
		BrowserAnimationsModule,
		ToastModule.forRoot(),
		AlertModule.forRoot()
	],
	providers: [
		BadgeService,
		CommentPostService,
		ExperienceService,
		FileService,
		QuestService,
		PageService,
		SectionService,
		SortService,
		UserService,
		ItemService,
		CookieService,
		AuthGuardService,
		AuthService,
		AlertService,
		LeaderboardService,
		{ provide: ToastOptions, useClass: CustomOption }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
