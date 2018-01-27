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
	User, Quest
} from 'shared/models';

import {
	QuestService,
	PageService,
	UserService
} from 'shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

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
		quest_start_time_date: new Date("01/25/2018"),
		quest_end_time_date: new Date("01/29/2018"),
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
	currentUser: User;
	//image dir
	image: string = "";

	//for profile pages
	editForm: FormGroup;
	isProfile: boolean = true;
	isEditing: boolean = false;

	//for quest
	quests: Quest[];
	questClicked: Quest;
	//for quest modal
	bsModalRef: BsModalRef;
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
		private modalService: BsModalService,
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
			if (isProfile) {
				this.initializeForm();
			} else {
				this.getQuests(this.currentUser.getUserId());
				this.timeDisplays();
			}
		});
		this.checkSize();
	}

	initializeForm() {
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

	openQuest(template: TemplateRef<any>, quest: any) { //'quest: any' in here means the quest has not been converted to Quest type
		//AHJ: Unimplemented
		//WARNING!! Remove QUESTS in specific-qm.html when this is implemented
		console.log(quest);
		this.questClicked = new Quest(quest);
		if (this.questClicked) {
			this.bsModalRef = this.modalService.show(template);
		}
	}

	abandonQuest(questId: String) {
		console.log(questId + " abandoned!");
		this.bsModalRef.hide();
	}

	submitQuest(questId: String) {
		console.log(questId + " submitted!");
		this.bsModalRef.hide();
	}

	timeDisplays() {
		let string: string = "";

		this.questTimeDisplay = [];
		this.questTimePercentage = [];
		setInterval(() => {
			for (let i = 0; i < this.quests.length; i++) {
				this.progressBarClass[i] = this.quests[i].getQuestProgressBarClass();
				this.questTimeDisplay[i] = this.quests[i].getQuestTimeLabel();
				this.questTimePercentage[i] = this.quests[i].getQuestTimePercentage();
			}
		}, 1000);
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
	formatDateTime(date) {
		return this.pageService.formatDateTime(date);
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
