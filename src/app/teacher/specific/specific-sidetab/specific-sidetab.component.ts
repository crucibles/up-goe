//Core Imports
import {
	Component,
	OnInit,
	HostListener,
	ElementRef,
	TemplateRef
} from '@angular/core';

import {
	FormBuilder,
	FormGroup,
	FormControl,
	Validators
} from '@angular/forms';


//Application Imports
import {
	User
} from 'shared/models';

import {
	PageService,
	UserService
} from 'shared/services';

const imageDir: string = "/assets/images/";

@Component({
	selector: 'specific-sidetab',
	templateUrl: './specific-sidetab.component.html',
	styleUrls: ['./specific-sidetab.component.css'],
	host: {
		'(document:click)': 'handleClick($event)',
	}
})

export class SpecificSidetabComponent implements OnInit {
	currentUser: User;
	//image dir
	image: string = "";

	//for profile pages
	editForm: FormGroup;
	isProfile: boolean = true;
	isEditing: boolean = false;

	//for quest
	//for quest modal
	//for progress bar; 
	defaultPBClass: string = 'progress-bar progress-bar-striped';
	progressBarClass: string[] = [];
	questTimePercentage: string[];
	questTimeDisplay: string[];

	// for collapsible sidetab
	isShowSideTab: boolean = false;
	windowWidth: number = window.innerWidth;

	constructor(
		private elementRef: ElementRef,
		private formBuilder: FormBuilder,
		private pageService: PageService,
		private userService: UserService
	) {
		this.image = imageDir + "not-found.jpg";
	}

	ngOnInit() {
		this.setUser();
		this.pageService.isProfile.subscribe(isProfile => {
			this.isProfile = isProfile;
			if (isProfile) {
				this.initializeForm();
			} 
		});
		this.checkSize();
	}

	initializeForm() {
		this.editForm = this.formBuilder.group({
			schoolId: new FormControl({value: this.currentUser.getUserSchoolId(), disabled: true}),
			email: new FormControl(this.currentUser.getUserEmail(), Validators.required),
			contactNo: new FormControl(this.currentUser.getUserContactNo(), Validators.required),
		});
		this.editForm.disable();
	}

	/**
	 * Obtains current user.
	 * @description Obtains current user and stores it to 'currentUser' variable;
	 */
	setUser() {
		//AHJ: current user is not yet obtained
		this.currentUser = this.userService.getCurrentUser();
		this.image = this.currentUser.getUserPhoto();
	}

	/**
	 * Ends the editing of the user information by disabling the form
	 */
	endEditing() {
		this.isEditing = !this.isEditing;
		this.editForm.disable();
	}

	/**
	 * Starts the editing of the user information by enabling the form
	 */
	startEditing() {
		this.isEditing = !this.isEditing;
		this.editForm.enable();
		this.editForm.get("schoolId").disable();
	}

	/* Below are helper functions */
	formatDateTime(date) {
		return this.pageService.formatDateTime(date);
	}

	/**
	 * Collapse sidetab when clicked outside
	 * @param event 
	 */
	handleClick(event) {
		var clickedComponent = event.target;
		var inside = false;
		do {
			if (clickedComponent === this.elementRef.nativeElement) {
				inside = true;
			}
			clickedComponent = clickedComponent.parentNode;
		} while (clickedComponent);
		if (!inside && this.windowWidth <= 768) {
			this.isShowSideTab = false;
		}
	}

	/**
	 * Shows/Hides sidetab on click
	 */
	clickMenuButton() {
		this.isShowSideTab = !this.isShowSideTab;
	}

	/**
	 * Updates when screen size is changed
	 * @param event 
	 */
	@HostListener('window:resize', ['$event'])
	resize(event) {
		this.checkSize();
	}

	/**
	 * Shows/Hide sidetab on resize
	 */
	checkSize() {
		this.windowWidth = window.innerWidth;
		if (this.windowWidth <= 768) {
			this.isShowSideTab = false;
		} else {
			this.isShowSideTab = true;
		}
	}
}
