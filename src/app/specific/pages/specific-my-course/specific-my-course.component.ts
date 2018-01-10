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
	Course, 
	Section, 
	Student,
	User
} from 'shared/models';

import {
	PageService,
	SectionService
} from 'shared/services';

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
		user_photo: "cute-cat.jpg",
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
	private currentCourse: any;
	private currentSection: Section;
	private classmates: User[];

	constructor(
		private pageService: PageService,
		private sectionService: SectionService,
		private route: ActivatedRoute
	) { }

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
	 * @description Obtains the current section and stores it into 'currentSection' variable
	 */
	getCurrentCourseSection() {
		this.route.paramMap.subscribe(params => {
			let sectionId = params.get('sectionId');
			//AHJ: unimplemented; replace dummyCourseSection with this.sectionService.getCourseSection(section_id) if working OR
			//with getCourse(section_id). Discussion is found in function getCourseSection(section_id) in section.service.ts
			this.currentSection = new Section(dummyCourseSection.section);
			this.currentCourse = new Course(dummyCourseSection.course);
			this.classmates = [];
			console.log(STUDENTS);
			STUDENTS.forEach(student => {
				this.classmates.push(new User(student));
			});
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
		let student: Student = this.currentSection.getStudents().filter(student =>
			student.user_id == user_id
		)[0];
		let status = student ? student.getStatus(true) : "N/A";

		return status;
	}
}
