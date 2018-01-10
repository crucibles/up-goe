//Core Imports
import {
	Component,
	OnInit,
	ViewChild,
	TemplateRef
} from '@angular/core';

import {
	ActivatedRoute
} from '@angular/router';

//Third-Party Imports
import {
	BsModalRef,
	BsModalService,
	ModalDirective
} from 'ngx-bootstrap';

//Application Imports
import {
	Quest, 
	Section, 
	SectionQuest, 
	User
} from 'shared/models';

import {
	PageService,
	SectionService,
	UserService
} from 'shared/services';

const SECTION: any = {
	_id: "2",
	course_id: "sad3",
	section_name: "A",
	students: [
		{
			user_id: "1",
			status: "E"
		},
		{
			user_id: "2",
			status: "R"
		}
	],
	instructor: "Miguel Guillermo",
	quests: [
		new SectionQuest({ quest_id: "1", quest_participants: ["5a37f4500d1126321c11e5e7", "2"], quest_prerequisite: [] }),
		new SectionQuest({ quest_id: "2", quest_participants: ["1", "2"], quest_prerequisite: [] })
	],
	items: [],
	badges: []
};

@Component({
	selector: 'app-specific-quest-map',
	templateUrl: './specific-quest-map.component.html',
	styleUrls: ['./specific-quest-map.component.css']
})
export class SpecificQuestMapComponent implements OnInit {
	currentUser: User;
	//AHJ: unimplemented; remove this when quest is retrieved properly
	private QUEST: any = {
		_id: "1",
		quest_title: "Missing Ring!",
		quest_description: "Retrieve the missing ring.",
		quest_retakable: false,
		quest_badge: "324",
		quest_item: ["1324", "2323", "324234"],
		quest_xp: 134,
		quest_hp: 3432,
		quest_start_time_date: new Date('01/01/2017'),
		quest_end_time_date: new Date('10/10/2019'),
		quest_party: false,
		quest_prerequisite: []
	}


	private bsModalRef: BsModalRef;
	private currentSection: Section;
	private questClicked: Quest;

	constructor(
		private modalService: BsModalService,
		private pageService: PageService,
		private route: ActivatedRoute,
		private sectionService: SectionService,
		private userService: UserService

	) { }

	ngOnInit() {
		this.setDefault();
		this.getCurrentUser();
		this.getCurrentSection();
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

	/**
	 * Sets all the default less-related functions/properties of the component
	 */
	setDefault() {
		this.pageService.isProfilePage(false);
	}

	/**
	 * Obtains the user's navigated section
	 * @description Obtains the current section and stores it into 'currentSection' variable
	 */
	getCurrentSection() {
		this.route.paramMap.subscribe(params => {
			console.log("asdasd");
			let sectionId = params.get('sectionId');
			//AHJ: unimplemented; dummy section remove when working
			this.currentSection = new Section(SECTION);
		});
	}

	getCurrentUser() {
		//AHJ: unimplemented... or not sure. Di ko sure kung tama na ning pagkuha sa current user
		this.currentUser = new User(this.userService.getCurrentUser());
		console.log("currUser");
		console.log(this.currentUser);
	}

	acceptQuest() {
		//AHJ: unimplemented
		this.bsModalRef.hide();
	}

	submitQuest() {
		//AHJ: unimplemented
		this.bsModalRef.hide();
	}

	abandonQuest() {
		//AHJ: unimplemented
		this.bsModalRef.hide();
	}

	isParticipating(quest_id: string): boolean {
		let isParticipant = this.currentSection.isQuestParticipant(this.currentUser.getUserId(), quest_id);
		
		return isParticipant;
	}
}
