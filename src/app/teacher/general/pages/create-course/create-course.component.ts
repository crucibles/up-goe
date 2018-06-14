// Core Imports
import {
	Component,
	ElementRef,
	OnInit
} from '@angular/core';

import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';

// Application Imports
import {
	User, Section, Course
} from 'shared/models';

import {
	PageService,
	UserService,
	SectionService
} from 'shared/services';
import { ToastsManager } from 'ng2-toastr';

@Component({
	selector: 'create-course',
	templateUrl: './create-course.component.html',
	styleUrls: ['./create-course.component.css'],
	host: {
		'(document:click)': 'handleClick($event)',
	}
})
export class CreateCourseComponent implements OnInit {

	//current user
	currentUser: User;
	image: string = "";

	//for profile page only
	sectionForm: FormGroup;
	isEditing: boolean = false;
	isChecked: boolean[] = [];

	scheduleDays: any[] = [];

	week: String[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	//for collapsible sidetab
	isShowSideTab: boolean = false;

	constructor(
		private elementRef: ElementRef,
		private formBuilder: FormBuilder,
		private pageService: PageService,
		private sectionService: SectionService,
		private userService: UserService,
		private toastr: ToastsManager
	) {
		this.getUser();
		this.createScheduleArray();
		this.initializeForm();
	}

	ngOnInit() {
	}

	createScheduleArray() {
		this.scheduleDays = [];
		this.scheduleDays = this.week.map(function week(day) {
			let obj = {
				day: day,
				isChecked: false,
				minTime: new Date(),
				maxTime: new Date()
			}
			return obj;
		});
	}

	initializeForm() {
		this.sectionForm = this.formBuilder.group({
			courseName: new FormControl("", Validators.required),
			courseDescription: new FormControl("", Validators.required),
			courseSection: new FormControl("", Validators.required),
			sectionType: new FormControl("", Validators.required),
			scheduleDays: this.buildSchedule()
		});
	}

	buildSchedule() {
		const arr = this.scheduleDays.map(day => {
			return this.formBuilder.group({
				day: day.day,
				isChecked: day.isChecked,
				minTime: day.minTime,
				maxTime: day.maxTime
			})
		});
		return this.formBuilder.array(arr);
	}

	/**
	 * Obtains information of the current user
	 * @description Obtains current user's information as well as knowing what information to display
	 * in the sidetab; personal information are displayed on general-profile page while 
	 * section quests are for other pages except general-profile page
	 */
	getUser(): void {
		this.currentUser = this.userService.getCurrentUser();
		this.image = this.currentUser.getUserPhoto();
	}

	/*Below are the helper functions for this component */

	/**
	 * Navigates to the specific section's page
	 * @param section_id id of the section where the user must be redirected to
	 */
	openSectionPage(section_id: string) {
		this.pageService.openSectionPage(section_id);
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
		if (!inside) {
			this.isShowSideTab = false;
		}
	}

	get scheduleDaysArray(): FormArray {
		return this.sectionForm.get('scheduleDays') as FormArray;
	}

	clickMenuButton() {
		this.isShowSideTab = !this.isShowSideTab;
	}

	submitCourseSection() {
		console.warn(this.sectionForm);
		let newSection: Section = new Section();
		let sched = [];
		sched = this.sectionForm.value.scheduleDays;
		let schedule = sched.filter((sched) => {
			if(sched.isChecked){
				return sched;
			}
		}).map((sched) => {
			sched.maxTime = new Date(sched.maxTime).toLocaleTimeString();
			sched.minTime = new Date(sched.minTime).toLocaleTimeString();
			return sched;
		})
		
		newSection.setSection("", this.sectionForm.value.courseSection, [], this.currentUser.getUserFullName(), [], [], [], schedule);
		console.warn("NEW SECTION", newSection);
		let newCourse: Course = new Course();
		newCourse.setCourse(this.sectionForm.value.courseName, this.sectionForm.value.courseDescription);
		console.log(newCourse);
		//AHJ: unimplemented; use section service to add section and course to the database
		this.sectionService.createCourseSection(
			this.sectionForm.value.courseName,
			this.sectionForm.value.courseDescription,
			this.sectionForm.value.courseSection,
			[],
			this.currentUser.getUserId(),
			[],
			[],
			[],
			schedule
		).subscribe(marj => {
			this.pageService.isCourseCreated(true);
			this.toastr.success(this.sectionForm.value.courseName, "Created Course success!");
		});
		this.isShowSideTab = !this.isShowSideTab;
		//this.sectionService.createSection(section);
	}

	isDayChecked() {
		const arr = this.sectionForm.get('scheduleDays') as FormArray;
		for (let day of arr.value) {
			if (day.isChecked) {
				return true;
			}
		}
		return false;
	}
}
