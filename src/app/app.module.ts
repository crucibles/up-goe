//Core Imports
import {
	NgModule
} from '@angular/core';

import {
	BrowserModule
} from '@angular/platform-browser';

//Third-Party Imports
import {
	CookieService
} from 'ngx-cookie-service';

//Application Imports
import {
	AppComponent
} from './app.component';

import {
	AppRoutingModule
} from './app-routing.module';

import {
	LogInComponent
} from 'log-in/log-in.component';

import {
	BadgeService,
	CommentPostService,
	ItemService,
	PageService,
	QuestService,
	SectionService,
	UserService
} from 'shared/services';

import {
	SharedModule
} from './shared/shared.module';

import {
	SignUpComponent
} from 'sign-up/sign-up.component';

import {
	AuthGuardService
} from 'shared/services/auth-guard.service';

import {
	AuthService
} from 'shared/services/auth.service';

import {
	AlertService
} from 'shared/services/alert.service';

import {
	ToastModule, 
	ToastOptions
} from 'ng2-toastr/ng2-toastr';

import {
	CustomOption
} from './toast-option'

import {
	BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import { 
	ChangePasswordComponent 
} from './change-password/change-password.component';

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
		ToastModule.forRoot()
	],
	providers: [
		BadgeService,
		CommentPostService,
		QuestService,
		PageService,
		SectionService,
		UserService,
		ItemService,
		CookieService,
		AuthGuardService,
		AuthService,
		AlertService,
		{ provide: ToastOptions, useClass: CustomOption }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
