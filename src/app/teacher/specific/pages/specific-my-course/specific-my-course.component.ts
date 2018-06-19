//Core Imports
import {
	Component,
	OnInit,
	TemplateRef
} from '@angular/core';

import {
	ActivatedRoute
} from '@angular/router';

//Third-Party Imports
import {
	BsModalRef
} from 'ngx-bootstrap';

import {
	BsModalService
} from 'ngx-bootstrap/modal/bs-modal.service';

//Application Imports
import {
	Course,
	Section,
	Student,
	User,
	Conditions,
	Badge
} from 'shared/models';

import {
	PageService,
	SectionService,
	UserService,
	BadgeService
} from 'shared/services';

@Component({
	selector: 'app-specific-my-course',
	templateUrl: './specific-my-course.component.html',
	styleUrls: ['./specific-my-course.component.css']
})
export class SpecificMyCourseComponent implements OnInit {
	//modal
	private bsModalRef: BsModalRef;

	//currently navigated section and its course 
	private currentCourse: any;
	private currentSection: Section;
	private sectionBadges: Badge[];

	//classmate's properties
	private classmates: User[];
	private classmateClicked: User;
	private badgesDisplay: Badge[];


	constructor(
		private modalService: BsModalService,
		private pageService: PageService,
		private sectionService: SectionService,
		private userService: UserService,
		private route: ActivatedRoute,
		private badgeService: BadgeService
	) { }

	ngOnInit() {
		console.log(this.sectionService.getCurrentSection());
		// this.route.paramMap.subscribe(params => {
		// 	let section_id = params.get('sectionId');
		// 	console.log(section_id);
		// 	this.sectionService.searchSection(section_id).subscribe(res => {
		// 		console.log(res);
		// 		this.sectionService.setCurrentSection(new Section(res.section));
		// 	});
		// })
		this.setDefault();
		this.getCurrentCourseSection();
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
	getCurrentCourseSection() {
		//AHJ: unimplemented; replace dummyCourseSection with this.sectionService.getCourseSection(section_id) if working OR
		//with getCourse(section_id). Discussion is found in function getCourseSection(section_id) in section.service.ts
		this.currentSection = new Section(this.sectionService.getCurrentSection());
		this.currentCourse = new Course(this.sectionService.getCurrentCourse());
		this.classmates = [];

		this.sectionService.getSectionStudents(this.currentSection.getSectionId(), true).subscribe((students) => {
			if (students) {
				students.forEach(student => {
					if (student.length > 1) {
						this.userService.getUser(student).subscribe((user) => {
							this.classmates.push(new User(user));
						})
					}
				})
			}
		})
		this.getSectionBadges();
	}

	approveStudent(userId: string) {
		this.sectionService.approveUserToSection(userId, this.currentSection.getSectionId()).subscribe(
			approve => {
				this.currentSection.setStudentStatus(userId, "E");
			}
		)
	}

	getSectionBadges() {
		//AHJ: unimplemented; since getting current section badge is unavailable... BADGES variable is being used instead

		this.badgeService.getSectionBadges(this.sectionService.getCurrentSection().getSectionId()).subscribe(badges => {
			if(badges) {
				this.sectionBadges = badges.map(badge => new Badge(badge));
			} else {
				console.warn('no badges acquired');
			}
		});
	}

	/**
	 * Returns student current status
	 * @description Returns the status of the passed user_id by comparing its id found in the student array of the section 
	 * and obtaining its status
	 * @param user_id Id of the user whose status is to be retrieved
	 * 
	 * @returns user's status
	 */
	getStudentStatus(user_id: string): string {
		let status: string = this.currentSection.getStudentStatus(user_id, true);
		status = status == "Requesting"? "Approve": status;
		return status;
	}

	/**
	 * Open classmate profile
	 * @description Open classmate's profile by storing received 'classmate' parameter to 
	 * @param questTemplate 
	 * @param classmate 
	 */
	openClassmateProfile(studentTemplate: TemplateRef<any>, classmate: User) {
		this.classmateClicked = classmate;
		if (this.classmateClicked) {
			this.bsModalRef = this.modalService.show(studentTemplate);
		}
	}
}
