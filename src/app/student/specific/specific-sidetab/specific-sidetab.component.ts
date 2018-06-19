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

import {
	ActivatedRoute,
	ParamMap
} from '@angular/router';

//Third-Party Importsn
import {
	BsModalRef,
	BsModalService
} from 'ngx-bootstrap';

import {
	FileUploader
} from 'ng2-file-upload/ng2-file-upload';

import {
	ToastsManager
} from 'ng2-toastr';

//Application Imports
import {
	User, 
	Quest, 
	Badge,
	Section
} from 'shared/models';

import {
	QuestService,
	PageService,
	UserService,
	SectionService,
	BadgeService
} from 'shared/services';

import {
	SpecificComponent
} from 'student/specific/specific.component';

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
	currentSection: Section;
	@Input('sectionId') section_id: string;

	private url = 'api/upload';
	public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'file' });

	commentBox: string = "";
	currentUser: User;
	user;

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
	badgeName: any = "";

	constructor(
		private elementRef: ElementRef,
		private formBuilder: FormBuilder,
		private modalService: BsModalService,
		private pageService: PageService,
		private questService: QuestService,
		private userService: UserService,
		private route: ActivatedRoute,
		private sectionService: SectionService,
		private toastr: ToastsManager,
		private badgeService: BadgeService
	) {
		this.image = imageDir + "not-found.jpg";
		this.uploader = new FileUploader({ url: this.url, itemAlias: 'file' });
	}

	ngOnInit() {
		//override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
		this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
		//overide the onCompleteItem property of the uploader so we are 
		//able to deal with the server response.
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			this.toastr.success("Well done!", "Upload success!");
			this.submitQuest(this.questClicked.getQuestId(), JSON.parse(response));
		};

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

	getBadgeName(badge_id: any) {
		if(badge_id){
			this.badgeService.getBadge(badge_id).subscribe(res => {
				this.badgeName = new Badge(res).getBadgeName();
			});
		}
		this.badgeName = "";
	}

	submit() {
		if (this.editForm.get('contactNo').dirty) {
			let currentUserId = this.userService.getCurrentUser().getUserId();
			let userContactNo = this.editForm.value.contactNo;

			this.userService.changeProfileData(currentUserId, userContactNo)
				.subscribe(isAdded => { // No returned value yet...
					if (isAdded) {
						this.initializeForm();
					} else {
						console.log('Profile failed to be edited.');
					}
				});
			this.currentUser.setUserContactno(userContactNo);
		}
	}

	get userContactNo() {
		return this.editForm.get('contactNo') as FormControl;
	}

	initializeForm() {
		this.editForm = this.formBuilder.group({
			schoolId: new FormControl({ value: this.currentUser.getUserSchoolId(), disabled: true }),
			email: new FormControl({ value: this.currentUser.getUserEmail(), disabled: true }),
			// contactNo: new FormControl(this.currentUser.getUserContactNo(), Validators.required),
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
		this.currentSection = this.sectionService.getCurrentSection();
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
		this.quests = [];
		let counter = 0;
		if(this.sectionService.getCurrentSection()){
			this.sectionService.getCurrentSection().getQuests().map((sq) => {
				this.questService.getQuest(sq.getSectionQuestId()).subscribe((quest) => {
	
					sq.getQuestParticipants().forEach(qp => {
						if (qp == user_id) {
							this.quests.push(new Quest(quest));
						}
					});
					counter++;
					if (this.sectionService.getCurrentSection().getQuests().length == counter) {
						this.isDataLoaded = true;
					}
				});
			});
		}
	}

	/**
	 * Open clicked quest by displaying quest modal
	 * @param template template to be opened
	 * @param quest quest to be viewed
	 */
	openQuest(template: TemplateRef<any>, quest: any) { //'quest: any' in here means the quest has not been converted to Quest type

		this.questClicked = quest;
		this.getBadgeName(this.questClicked.getQuestBadge());
		if (this.questClicked) {
			this.bsModalRef = this.modalService.show(template);
		}
	}

	/**
	 * Abandons currently clicked quest
	 * @param questId id of the quest to be abandoned
	 */
	abandonQuest(questId: String) {
		console.warn("hello");
		this.toastr.warning(
			"You have abandoned a quest.",
			"Quest Abandoned!"
		);
		let user_id = this.userService.getCurrentUser().getUserId();
		let quest_id = this.questClicked.getQuestId();
		let section_id = this.currentSection.getSectionId();

		this.questService.abandonQuest(user_id, quest_id, section_id).subscribe((result) => {
		});
		this.bsModalRef.hide();
	}

	/**
	 * Submits currently clicked quest
	 * @param questId id of the quest to be submitted
	 */
	submitQuest(questId: String, res: any) {
		console.log(res);
		let user_id = this.userService.getCurrentUser().getUserId();
		//AHJ: unimplemented

		this.questService.submitQuest(res, this.commentBox, user_id, questId, "").subscribe(res => {
			console.warn(res);
			this.bsModalRef.hide();
		});
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
		this.editForm.get("email").disable();
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
