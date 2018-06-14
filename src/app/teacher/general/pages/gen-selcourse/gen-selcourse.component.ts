//Core Imports
import {
	Component,
	OnInit
} from '@angular/core';

import {
	NgModel
} from '@angular/forms';

import {
	Router
} from '@angular/router';
//Application Imports
import {
	Course,
	Quest,
	Section,
	User
} from 'shared/models';

import {
	SectionService,
	UserService,
	PageService,
	SortService
} from 'shared/services';

@Component({
	selector: 'gen-selcourse',
	templateUrl: './gen-selcourse.component.html',
	styleUrls: ['./gen-selcourse.component.css']
})
export class GenSelcourseComponent implements OnInit {

	sections: any[];
	schedules: any[];
	table: any;
	courses: Course[];
	currentUser: User;
	allcourses: Course[];

	//for search bar
	course_search: string;
	isSearching: boolean = false;
	course_found: any[];

	constructor(
		private pageService: PageService,
		private sectionService: SectionService,
		private sortService: SortService,
		private userService: UserService,
		private router: Router
	) {
		this.pageService.isProfilePage(false);
	}

	ngOnInit() {
		this.setDefault();
		this.getUser();
	}

	setDefault() {
		this.pageService.isCourseCreate.subscribe(isCourseCreated => {
			if (isCourseCreated) {
				this.getUserSections(this.currentUser.getUserId());
			}
		});
	}

	/**
	 * Obtains information of the current user
	 */
	getUser(): void {
		let user = JSON.parse(localStorage.getItem("currentUser"));
		this.userService.getUser(user._id)
			.subscribe(user => {
				this.currentUser = new User(user);
				this.getUserSections(this.currentUser.getUserId());
			});
	}

	/**
	 * Obtains status of user's sections
	 */
	getStatusOfSection(students) {
		let currentUser = JSON.parse(localStorage.getItem("currentUser"));
		let status = students.filter(user => user.user_id == currentUser._id)[0].status;
		if (status == "E") {
			return "Enrolled";
		} else if (status == "R") {
			return "Requesting";
		}

	}

	/**
	 * Obtains sections and its respective course of the current use
	 * @description Obtains sections and its respective course of the current user by storing it to 'courses' 
	 * and 'section' array respectively
	 * @param user_id id of the user whose array of 
	 * @returns an Array of objects with a structure of [{section: {Section}, course_name: Section's course_name}, {...}]
	 */
	getUserSections(user_id): void {
		this.sectionService.getInstructorSections(user_id)
			.subscribe(sections => {
				this.sections = sections;
				if(this.sections && this.sections.length > 0){
					this.sections = this.sectionService.getSortedSections(
						this.sections,
						{
							sortColumn: "courseName",
							sortDirection: "asc"
						}
					);
					this.schedules = this.sections.map(x => {
						return x.section.schedule;
					});
				}
			});
	}

	/**
	 * @summary searches the string entered by the user and stores result in 'course_found' variable
	 */
	search() {
		if (this.course_search == null || this.course_search.length == 0) {
			this.isSearching = false;
		} else {
			this.isSearching = true;
			this.sectionService.searchSection(this.course_search).subscribe((sections) => {
				this.course_found = sections;
			});
		}
	}

	onSorted($event) {
		this.sections = this.sectionService.getSortedSections(this.sections, $event);
	}

	openSectionPage(section_id: string, section: Section) {
		//AHJ: unimplemented; dapat dili na kaayo hardcode? Pwede gud ni pero murag hugaw
		this.sectionService.setCurrentSection(section);
		this.pageService.openTeacherSectionPage(section_id);
	}
}
