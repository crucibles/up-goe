//Core Imports
import {
	Component,
	OnInit,
	Input,
	HostListener,
	ElementRef,
	TemplateRef
} from '@angular/core';

import {
	FormBuilder,
	FormGroup,
	NgModel,
	Validators,
	FormControl
} from '@angular/forms';

import {
	Router
} from '@angular/router';

//Third-Party Imports
import {
	BsModalService,
	BsModalRef
} from 'ngx-bootstrap';

//Application Imports
import {
	CommentPost,
	Course,
	Quest,
	Section,
	User,
	imageDir
} from 'shared/models';

import {
	CommentPostService,
	PageService,
	QuestService,
	SectionService,
	UserService
} from 'shared/services';


@Component({
	selector: 'gen-sidetab',
	templateUrl: './gen-sidetab.component.html',
	styleUrls: ['./gen-sidetab.component.css'],
	host: {
		'(document:click)': 'handleClick($event)',
	}
})
export class GenSidetabComponent implements OnInit {
	@Input('isProfile') isProfile: boolean = false;

	//current user
	currentUser: User;
	image: string = "";
  
	//for profile page only
	editForm: FormGroup;
	isEditing: boolean = false;

	//for collapsible sidetab
	isShowSideTab: boolean = false;
	windowWidth: number = window.innerWidth;

	//if screen size changes it'll update
	@HostListener('window:resize', ['$event'])
	resize(event) {
		this.checkSize();
	}

	constructor(
		private elementRef: ElementRef,
		private formBuilder: FormBuilder,
		private pageService: PageService,
		private userService: UserService,
		private router: Router
	) {
		this.image = imageDir + "not-found.jpg";
		this.getUser();
		this.initializeForm();
	}

	ngOnInit() {
		this.checkSize();
		this.setDefault();
	}

	initializeForm() {
		this.editForm = this.formBuilder.group({
			schoolId: new FormControl(this.currentUser.getUserSchoolId()),
			email: new FormControl(this.currentUser.getUserEmail(), Validators.required),
			contactNo: new FormControl(this.currentUser.getUserContactNo(), Validators.required),
		});
		this.editForm.disable();
	}

	setDefault() {
		this.isEditing = false;
		this.pageService.isProfile.subscribe(isProfile => {
			this.isProfile = isProfile;
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

	/**
	 * Edits the user's information
	 * @description Edits the user's information; changes isEditing variable which changes the
	 * features of the input fields
	 */
	endEditing() {
		this.isEditing = !this.isEditing;
		this.editForm.disable();
	}

	startEditing() {
		this.isEditing = !this.isEditing;
		this.editForm.enable();
	}

	/*Below are the helper functions for this component */

	checkSize() {
		this.windowWidth = window.innerWidth;
		if (this.windowWidth <= 768) {
			this.isShowSideTab = false;
		} else {
			this.isShowSideTab = true;
		}
	}

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
		if (!inside && this.windowWidth <= 768) {
			this.isShowSideTab = false;
		}
	}

	clickMenuButton() {
		this.isShowSideTab = !this.isShowSideTab;
	}
}
