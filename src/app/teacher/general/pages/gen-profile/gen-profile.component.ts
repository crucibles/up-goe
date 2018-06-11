// Core Imports
import {
	Component,
	OnInit
} from '@angular/core';

import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';

//Application Imports
import {
	User
} from 'shared/models';

import {
	UserService
} from 'shared/services';

@Component({
	selector: 'app-gen-profile',
	templateUrl: './gen-profile.component.html',
	styleUrls: ['./gen-profile.component.css']
})
export class GenProfileComponent implements OnInit {
	// basic info
	currentUser: User;

	// for forms
	userForm: FormGroup;
	isEditing: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService
	) { }

	ngOnInit() {
		this.setDefault();
		this.getUser();
	}

	setDefault() {
		this.isEditing = false;
	}

	/**
	 * Obtains information of the current user
	 */
	getUser(): void {
		this.currentUser = this.userService.getCurrentUser();
		this.initializeForm();
	}

	initializeForm() {
		this.userForm = this.formBuilder.group({
			firstName: new FormControl(this.currentUser.getUserFirstName(), Validators.required),
			middleName: new FormControl(this.currentUser.getUserMiddleName()),
			lastName: new FormControl(this.currentUser.getUserLastName(), Validators.required),
			birthDate: new FormControl(this.currentUser.getUserFormattedBirthdate(), Validators.required),
			contactNo: new FormControl(this.currentUser.getUserContactNo(), Validators.required),
			schoolId: new FormControl(this.currentUser.getUserSchoolId(), Validators.required),
			email: new FormControl(this.currentUser.getUserEmail()),
		});
		this.userForm.disable();
	}

	editProfile() {
		if (this.userForm.invalid) {
			return;
		}

		if (this.userForm.get('contactNo').dirty) {
			let currentUserId = this.currentUser.getUserId();
			let userContactNo = this.userForm.value.contactNo;

			this.userService.changeProfileData(currentUserId, userContactNo)
				.subscribe(isAdded => { // No returned value yet...
					if (isAdded) {
						this.initializeForm();
					} else {
						console.log('Profile failed to be edited.');
					}
				});
			this.currentUser.setUserContactno(userContactNo);
			this.userForm.disable();
			this.isEditing = false;
		}
	}

	startEditing() {
		this.isEditing = true;
		this.userForm.get('contactNo').enable();
	}

}
