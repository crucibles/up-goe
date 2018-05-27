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
	UserService
} from 'shared/services';

const BADGES = [
	{
		_id: "1",
		badge_photo: "badge1.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "1",
		badge_photo: "badge1.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "1",
		badge_photo: "badge1.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "1",
		badge_photo: "badge1.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "1",
		badge_photo: "badge1.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "1",
		badge_photo: "badge1.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	},
	{
		_id: "2",
		badge_photo: "badge2.png",
		badge_description: "Earn this lol",
		badge_conditions: new Conditions(),
		is_system: false,
		badge_attainers: []
	}
];

const dummyCourseSection: any = {
	course: {
		_id: "1",
		course_name: "CMSC 128",
		course_description: "Gonna fly hiiiigh ~"
	},
	section: {
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
		quests: [],
		items: [],
		badges: []
	}
}

const STUDENTS: any[] = [
	{
		_id: "1",
		user_fname: "Cedric",
		user_mname: "Yao",
		user_lname: "Alvaro",
		user_birthdate: new Date('08/02/1997'),
		user_email: "cyalvaro@up.edu.ph",
		user_password: "p",
		user_type: "S",
		user_contact_no: "09499709292",
		user_photo: "cute-cat.jpg",
		user_school_id: "2014-60690",
		user_security_question: 'Gigil si akoe?',
		user_security_answer: 'Petmalu!'
	},
	{
		_id: "2",
		user_fname: "Donevir",
		user_mname: "Yao",
		user_lname: "Alvaro",
		user_birthdate: new Date('08/02/1997'),
		user_email: "cyalvaro@up.edu.ph",
		user_password: "p",
		user_type: "S",
		user_contact_no: "09499709292",
		user_photo: "cute-dog.jpg",
		user_school_id: "2014-60690",
		user_security_question: 'Gigil si akoe?',
		user_security_answer: 'Petmalu!'
	}
];

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
		private route: ActivatedRoute,
		private userService: UserService
	) {
	}

	ngOnInit() {
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
	 * @author Cedric Yao Alvaro
	 * @description Obtains the current section and stores it into 'currentSection' variable
	 */
	getCurrentCourseSection() {
		this.route.paramMap.subscribe(params => {
			let sectionId = params.get('sectionId');
			//AHJ: unimplemented; replace dummyCourseSection with this.sectionService.getCourseSection(section_id) if working OR
			//with getCourse(section_id). Discussion is found in function getCourseSection(section_id) in section.service.ts
			this.currentSection = new Section(this.sectionService.getCurrentSection());
			this.currentCourse = new Course(this.sectionService.getCurrentCourse());
			console.log(this.currentCourse);
			console.warn(this.currentSection);
			this.classmates = [];
			/*console.log(STUDENTS);
			STUDENTS.forEach(student => {
				this.classmates.push(new User(student));
			});*/
			this.sectionService.getSectionStudents(sectionId).subscribe((students) => {
				console.warn(students);
				students.forEach(student => {
					if (student.length > 1) {
						this.userService.getUser(student).subscribe((user) => {
							console.warn(user);
							this.classmates.push(new User(user));
						})
					}
				})
			})
			this.getSectionBadges();
		});
	}

	getSectionBadges() {
		//AHJ: unimplemented; since getting current section badge is unavailable... BADGES variable is being used instead
		this.sectionBadges = BADGES.map(badge => new Badge(badge));
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
			console.log("here!");
			console.log(this.classmateClicked);
			this.bsModalRef = this.modalService.show(studentTemplate);
			this.getClassmateBadges();
		}
	}

	getClassmateBadges() {
		//AHJ: unimplemented; idk unsay method gamiton pra maobtain ang badges sa isa ka student however I just create an array of dummy
		//badges to display
		this.badgesDisplay = BADGES.map(badge => new Badge(badge));
		console.log(this.badgesDisplay);
	}
}
