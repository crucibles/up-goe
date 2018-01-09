//Core Imports
import {
	Component,
	OnInit,
	HostListener
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

@Component({
	selector: 'specific-sidetab',
	templateUrl: './specific-sidetab.component.html',
	styleUrls: ['./specific-sidetab.component.css']
})
export class SpecificSidetabComponent implements OnInit {
	currentUser: User;
	isProfile: boolean = true;
	editForm: FormGroup;
	isEditing: boolean = false;

	//image dir
	imageDir: string = "/assets/images/";

	// for collapsible sidetab
	isShowMenuButton: boolean = false;
	windowWidth: number = window.innerWidth;

	//if screen size changes it'll update
	@HostListener('window:resize', ['$event'])
	resize(event) {
		this.checkSize();
	}

	checkSize() {
		this.windowWidth = window.innerWidth;
		if (this.windowWidth <= 765) {
			this.isShowMenuButton = true;
		} else {
			this.isShowMenuButton = false;
		}
	}

	constructor(
		private formBuilder: FormBuilder,
		private pageService: PageService,
		private userService: UserService
	) {
	}

	ngOnInit() {
		this.getUser();
		this.setDefault();
		this.editForm = this.formBuilder.group({
			schoolId: new FormControl(this.currentUser.getUserSchoolId(), Validators.required),
			email: new FormControl(this.currentUser.getUserEmail(), Validators.required),
			contactNo: new FormControl(this.currentUser.getUserContactNo(), Validators.required),
		});
		this.editForm.disable();
		this.checkSize();
	}

	getUser() {
		//AHJ: current user is not yet obtained
		this.currentUser = this.userService.getCurrentUser();
		let image: string = this.currentUser.getUserPhoto() ?
			this.currentUser.getUserPhoto() :
			"avatar.jpg";
		this.currentUser.setUserPhoto(image);
	}

	setDefault() {
		this.pageService.isProfile.subscribe(isProfile => {
			this.isProfile = isProfile;
		});
	}

	endEditing() {
		this.isEditing = !this.isEditing;
		this.editForm.disable();
	}

	startEditing() {
		this.isEditing = !this.isEditing;
		this.editForm.enable();
	}
}
