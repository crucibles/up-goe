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
	Section, Quest
} from 'shared/models';

import {
	PageService,
	SectionService
} from 'shared/services';

@Component({
	selector: 'app-specific-quest-map',
	templateUrl: './specific-quest-map.component.html',
	styleUrls: ['./specific-quest-map.component.css']
})
export class SpecificQuestMapComponent implements OnInit {
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
		private sectionService: SectionService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.setDefault();
		this.getCurrentSection();
	}

	openQuest(template: TemplateRef<any>, quest: any) { //'quest: any' in here means the quest has not been converted to Quest type
		//AHJ: Unimplemented
		//WARNING!! Remove QUESTS in specific-qm.html when this is implemented
		console.log(quest);
		this.questClicked = new Quest(quest);
		if (this.questClicked) {
			console.log("here!");
			console.log(this.questClicked);
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
			let sectionId = params.get('sectionId');
		});
	}

	acceptQuest(){
		//AHJ: unimplemented
		this.bsModalRef.hide();
	}

}
