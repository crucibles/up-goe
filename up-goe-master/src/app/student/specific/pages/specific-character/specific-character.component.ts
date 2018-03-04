//Core Imports
import {
	Component,
	OnInit
} from '@angular/core';

import {
	ActivatedRoute
} from '@angular/router';

//Application Imports
import {
	Section
} from 'shared/models';

import {
	PageService,
	SectionService
} from 'shared/services';

@Component({
	selector: 'app-specific-character',
	templateUrl: './specific-character.component.html',
	styleUrls: ['./specific-character.component.css']
})
export class SpecificCharacterComponent implements OnInit {

	private currentSection: Section;

	constructor(
		private pageService: PageService,
		private sectionService: SectionService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.setDefault();
		this.getCurrentSection();
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

}
