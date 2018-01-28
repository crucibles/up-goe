import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, PageService } from 'shared/services';
import { User } from 'shared/models';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
	host: {
		'(document:click)': 'handleClick($event)',
	}
})
export class CreateCourseComponent implements OnInit {

	//current user
	currentUser: User;
	image: string = "";
  
	//for profile page only
	sectionForm: FormGroup;
	isEditing: boolean = false;
	isChecked: boolean[] = [];

	week: String[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	//for collapsible sidetab
  isShowSideTab: boolean = false;
  
	constructor(
		private elementRef: ElementRef,
		private formBuilder: FormBuilder,
		private pageService: PageService,
		private userService: UserService
	) {
		this.getUser();
		this.initializeForm();
	}

	ngOnInit() {
	}

	initializeForm() {
		this.sectionForm = this.formBuilder.group({
			courseName: new FormControl("", Validators.required),
			courseDescription: new FormControl("", Validators.required),
			courseSection: new FormControl("", Validators.required),
			sectionType: new FormControl("", Validators.required),
			scheduleDay: new FormControl("", Validators.required)
		});
	}

	/**
	 * Obtains information of the current user
	 * @description Obtains current user's information as well as knowing what information to display
	 * in the sidetab; personal information are displayed on general-profile page while 
	 * section quests are for other pages except general-profile page
	 */
	getUser(): void {
		this.currentUser = this.userService.getCurrentUser();
		this.image = this.currentUser.getUserPhoto();
	}

	/*Below are the helper functions for this component */

	/**
	 * Navigates to the specific section's page
	 * @param section_id id of the section where the user must be redirected to
	 */
	openSectionPage(section_id: string) {
		this.pageService.openSectionPage(section_id);
	}

	handleClick(event) {
		var clickedComponent = event.target;
		var inside = false;
		do {
			if (clickedComponent === this.elementRef.nativeElement) {
				inside = true;
			}
			clickedComponent = clickedComponent.parentNode;
		} while (clickedComponent);
		if (!inside) {
			this.isShowSideTab = false;
		}
	}

	clickMenuButton() {
		console.log(this.isShowSideTab);
		this.isShowSideTab = !this.isShowSideTab;
	}

	submitCourseSection(){
		console.log(this.sectionForm.value);
	}

	checkDay(e, index){
		if(e.target.checked){
			this.isChecked[index] = true;
			console.log(index + " is checked!");
		}
		else{
			this.isChecked[index] = false;
			console.log(index + " is not checked!");
		}
	}

}
