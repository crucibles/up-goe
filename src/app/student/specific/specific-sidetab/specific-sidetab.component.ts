//Core Imports
import {
	Component,
	OnInit,
	HostListener,
	ElementRef
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
	isProfile: boolean = true;
	editForm: FormGroup;
	isEditing: boolean = false;

	//image dir
	image: string = "";	

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
		this.getUser();
		this.pageService.isProfile.subscribe(isProfile => {
			this.isProfile = isProfile;
			if(isProfile){
				this.initializeForm();
			} else {
				//AHJ: unimplemented must request for quests
			}
		});
		this.checkSize();
	}
	
	initializeForm(){
		this.editForm = this.formBuilder.group({
			schoolId: new FormControl(this.currentUser.getUserSchoolId()),
			email: new FormControl(this.currentUser.getUserEmail(), Validators.required),
			contactNo: new FormControl(this.currentUser.getUserContactNo(), Validators.required),
		});
		this.editForm.disable();
	}

	getUser() {
		//AHJ: current user is not yet obtained
		this.currentUser = this.userService.getCurrentUser();
		this.image = this.currentUser.getUserPhoto();
	}

	endEditing() {
		this.isEditing = !this.isEditing;
		this.editForm.disable();
	}

	startEditing() {
		this.isEditing = !this.isEditing;
		this.editForm.enable();
	}

	/* Below are helper functions */

	handleClick(event) {
		var clickedComponent = event.target;
		var inside = false;
		do {
			if (clickedComponent === this.elementRef.nativeElement) {
				inside = true;
			}
			clickedComponent = clickedComponent.parentNode;
		} while (clickedComponent);
		if (!inside && this.windowWidth <= 765) {
			this.isShowSideTab = false;
		}
	}

	clickMenuButton() {
		this.isShowSideTab = !this.isShowSideTab;
	}

	//if screen size changes it'll update
	@HostListener('window:resize', ['$event'])
	resize(event) {
		this.checkSize();
	}

	checkSize() {
		this.windowWidth = window.innerWidth;
		if (this.windowWidth <= 765) {
			this.isShowSideTab = false;
		} else {
			this.isShowSideTab = true;
		}
	}
}
