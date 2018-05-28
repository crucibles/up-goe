//Core Imports
import {
	Component,
	OnInit,
	HostListener,
	ElementRef,
	TemplateRef,
	Input
} from '@angular/core';

import {
	FormBuilder,
	FormGroup,
	FormControl,
	Validators
} from '@angular/forms';


//Application Imports
import {
	User, Quest, SectionQuest, Course, Section
} from 'shared/models';

import {
	QuestService,
	PageService,
	UserService,
	SectionService
} from 'shared/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SpecificComponent } from 'student/specific/specific.component';

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
	@Input('sectionId') section_id: string;
	
	currentUser: User;
	//image dir
	image: string = "";
	sectionId: string = this.section_id;

	//for profile pages
	editForm: FormGroup;
	isProfile: boolean = true;
	isEditing: boolean = false;

	//for quest
	quests: Quest[];
	isDataLoaded: boolean = false;
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
		private userService: UserService,
		private route: ActivatedRoute,
		private sectionService: SectionService
	) {
		this.image = imageDir + "not-found.jpg";
	}

	ngOnInit() {
		this.setUser();
		this.pageService.isProfile.subscribe(isProfile => {
			this.isProfile = isProfile;
			if (isProfile) {
				this.initializeForm();
			} else {
				this.setQuests(this.currentUser.getUserId());
				this.timeDisplays();
			}
		});
		this.checkSize();
	}

	initializeForm() {
		this.editForm = this.formBuilder.group({
			schoolId: new FormControl({ value: this.currentUser.getUserSchoolId(), disabled: true }),
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
	 * Obtains quests participated by the user.
	 * @description Obtains quests of the current user and stores it to 'courses' variable;
	 * used when user is navigating on pages other than the general-profile page
	 * 
	 * @param user_id the id of the user that asks for the list of quests
	 */
	setQuests(user_id): void {
		// AHJ: unimplemented; add quest service to obtain quests of the current section
		console.warn(this.sectionService.getCurrentSection());
		this.quests = [];
		let counter = 0;
		this.sectionService.getCurrentSection().getQuests().map((sq) => {
			this.questService.getQuest(sq.getSectionQuestId()).subscribe((quest) => {
				this.quests.push(new Quest(quest));
				counter++;
				if(this.sectionService.getCurrentSection().getQuests().length == counter){
					this.isDataLoaded = true;
				}
			});
		});
	}

	/**
	 * Open clicked quest by displaying quest modal
	 * @param template template to be opened
	 * @param quest quest to be viewed
	 */
	openQuest(template: TemplateRef<any>, quest: any) { //'quest: any' in here means the quest has not been converted to Quest type
		//AHJ: Unimplemented
		//WARNING!! Remove QUESTS in specific-qm.html when this is implemented
		console.log(quest);
		this.questClicked = quest;
		if (this.questClicked) {
			this.bsModalRef = this.modalService.show(template);
		}
	}

	/**
	 * Abandons currently clicked quest
	 * @param questId id of the quest to be abandoned
	 */
	abandonQuest(questId: String) {
		console.log(questId + " abandoned!");
		this.bsModalRef.hide();
	}

	/**
	 * Submits currently clicked quest
	 * @param questId id of the quest to be submitted
	 */
	submitQuest(questId: String) {
		console.log(questId + " submitted!");
		this.bsModalRef.hide();
	}

	/**
	 * Sets the needed properties, styling, etc. of all section quests
	 */
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
