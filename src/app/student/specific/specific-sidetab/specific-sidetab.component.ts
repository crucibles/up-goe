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
	User, Quest
} from 'shared/models';

import {
	QuestService,
	PageService,
	UserService
} from 'shared/services';

const imageDir: string = "/assets/images/";

const QUESTS: any[] = [
	{
		_id: "2",
    	quest_title: "Let me gooo",
   		quest_description: "Please let me goooo",
   		quest_retakable: false,
   		quest_badge: "",
    	quest_item: [],
    	quest_xp: 10,
    	quest_hp: 10,
    	quest_start_time_date: new Date("10/10/2016"),
    	quest_end_time_date: new Date("10/10/2018"),
    	quest_party: false,
   		quest_prerequisite: []
	},
	{
		_id: "2",
    	quest_title: "Let me gooo too",
   		quest_description: "Please let me goooo too",
   		quest_retakable: false,
   		quest_badge: "",
    	quest_item: [],
    	quest_xp: 10,
    	quest_hp: 10,
    	quest_start_time_date: new Date("10/10/2016"),
    	quest_end_time_date: new Date("10/10/2018"),
    	quest_party: false,
   		quest_prerequisite: []
	}
];

@Component({
	selector: 'specific-sidetab',
	templateUrl: './specific-sidetab.component.html',
	styleUrls: ['./specific-sidetab.component.css'],
	host: {
		'(document:click)': 'handleClick($event)',
	}
})


export class SpecificSidetabComponent implements OnInit {
	quests: Quest[];
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
		private questService: QuestService,
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
				this.getQuests(this.currentUser.getUserId());
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

	/**
	 * Obtains quests participated by the user
	 * @description Obtains quests of the current user and stores it to 'courses' variable;
	 * used when user is navigating on pages other than the general-profile page
	 * 
	 * @param user_id the id of the user that asks for the list of quests
	 */
	getQuests(user_id): void {
		// AHJ: unimplemented; add quest service to obtain quests of the current section
		this.quests = QUESTS.map(quest => new Quest(quest));
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
