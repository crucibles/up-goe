//Core Imports
import {
	HttpClient,
	HttpParams,
	HttpHeaders
} from '@angular/common/http';

import {
	Injectable
} from '@angular/core';

import {
	Headers,
	RequestOptions
} from '@angular/http';

//Third-Party Imports
import {
	Observable
} from 'rxjs/Observable';

import {
	Observer
} from 'rxjs/Observer';

import {
	of
} from 'rxjs/observable/of';

import {
	catchError,
	map,
	tap
} from 'rxjs/operators';

//Application Imports
import {
	Course,
	Quest,
	Section,
	User,
} from 'shared/models';

import {
	UserService
} from './user.service';

@Injectable()
export class SectionService {

	private currentUserSections: any;
	private currentCourseSection: any;
	private currentCourse: Course;
	private currentSectionId: any;
	private currentSection: Section;

	private secUrl = "api/sections";

	/**
	 * Used for accessing/edit/deleting at api.js
	 */
	private courseUrl = "api/courses";

	/**
	 * Used for obtaining course information of sections at api.js
	 */
	private createCourseSectionUrl = "api/createCourseSection";

	/**
	 * Used for obtaining student information from sections at api.js
	 */
	private userSectionUrl = "api/sections/users";

	/**
	 * Used for obtaining student's experiences from sections at api.js
	 */
	private sectionExpUrl = "api/sections/experiences";

	/**
	 * Used for adding/obtaining experiences at api.js
	 */
	private expUrl = "api/sections/experiences";

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.currentUserSections = JSON.parse(localStorage.getItem('currentUserSections'));
	}

	getCurrentUserSections() {
		return this.currentUserSections;
	}

	setCurrentUserSections(userSections) {
		this.currentUserSections = userSections;
	}

	/**
	 * Adds received newly created course to the database
	 * @param course new course to be added to the database
	 */
	createCourseSection(
		courseName,
		courseDescription,
		sectionName,
		students,
		instructor,
		quests,
		items,
		badges,
		schedule
	) {
		const url = this.createCourseSectionUrl;
		return this.http.post<User>(url, {
			courseName,
			courseDescription,
			sectionName,
			students,
			instructor,
			quests,
			items,
			badges,
			schedule
		}).pipe(
			tap(data => {
				// Returns data from api.js to sign-up.component.ts.
				return data;
			}),
			catchError(this.handleError<User>(`creat course error course_name=${courseName}`))
		);
	}

	/**
	 * Adds received newly created section to the database
	 * @param course - new section to be added to the database
	 */
	createSection(section: Section) {
		const url = this.secUrl;
	}

	/**
	 * Adds students to the section's list of pending approval
	 * @param user_id id of the user to be added to the section's list of pending approval
	 * @param section_id id of the section where the user will be added
	 */
	sendRequestToSection(user_id: string, section_id: string) {
		const url = this.secUrl;

		let body = {
			user_id: user_id,
			section_id: section_id
		}

		return this.http.post(url, body).pipe(
			tap(data => {
				return data;
			}),
			catchError(this.handleError<any>(`requesting failed for =${body}`))
		);
	}

	/**
	 * Approves the student entry to the section 
	 * @param user_id id of the user whose entry is to be approved
	 * @param section_id id of the section where the entry is granted
	 */
	approveUserToSection(user_id: string, section_id: string) {
		const url = this.secUrl;

		let body = {
			user_id: user_id,
			section_id: section_id,
			approve: "yes"
		}

		return this.http.post(url, body).pipe(
			tap(data => {
				return data;
			}),
			catchError(this.handleError<any>(`requesting failed for =${body}`))
		);
	}

	/**
	 * Removes/reject the student from the section
	 * @param user_id id of the user to be rejected/removed
	 * @param section_id id of the section where the student is to be removed/rejected
	 */
	deleteUserFromSection(user_id: string, section_id: string) {
		const url = this.secUrl;
	}

	/**
	 * Edits existing section in the database.
	 * @description Edit old information of existing section of id contained in the section parameter
	 * with the new section received in the parameter
	 * @param section The section to be edited from the database; also contains id to identify which section to edit
	 * - section._id - id of the section to be edited
	 */
	editSection(section: Section) {
		const url = this.secUrl;
	}

	/**
	 * Edits existing course in the database.
	 * @description Edit old information of existing course of id contained in the course parameter
	 * with the new course received in the parameter
	 * @param course The course to be edited from the database; also contains id to identify which course to edit
	 * - course._id - id of the course to be edited
	 */
	editCourse(course: Course) {
		const url = this.secUrl;
	}

	/**
	 * Deletes course from the database.
	 * @description Deletes course from the database as well as the section underneath it
	 * @param section_id id of section to be deleted
	 */
	deleteCourse(section_id) {
		//const url = this.courseSectionUrl;
	}

	/**
	 * Deletes section from the database
	 * @param section_id id of section to be deleted
	 */
	deleteSection(section_id) {
		const url = this.secUrl;
	}

	/**
	 * Ends the section by finalizing and exporting the grades, removing all the students in the section
	 * while retaining the section name, description, etc.
	 * @param section old section information; also contains id to identify which section to edit
	 */
	endSection(section) {
		// murag graduation ang peg... di ko sure... feeling nko murag syag create section pro wipe out lng ang other information
	}
  
	/**
	* Returns the course information based by course id
	* @param course_id id of the course whose information are to be retrieved
	* 
	* @returns course information of the course
	*/
	getCourse(course_id): Observable<Course> {
		const url = this.courseUrl;
		let params = new HttpParams().set('id', course_id);

		return this.http.get<Course>(url, {
			params: params
		}).pipe(
			tap(h => {
				const outcome = h ?
					'fetched course ' + course_id : 'did not find course ' + course_id;
			}),
			catchError(this.handleError<Course>(`getCourse course_id=${course_id}`))
		);
	}

	/**
	 * @author Cedric Y. Alvaro
	 * Sets the current course the user is navigating
	 */
	setCurrentCourse(cs: Course) {
		this.currentCourse = cs;
	}

	/**
	 * Returns the course & section information based by the section id
	 * @param section_id id of the section whose course information are to be retrieved
	 * 
	 * @returns course name and section information
	 * - obj.course   - information of the section's course
	 * - obj.section  - information of the section
	 * 
	 * The expected value returned by the database is an object containing the course and section based on section_id
	 * @example
	 * objectReturned = {
	 * course: Course
	 * section: Section
	 * }
	 * 
	 */
	getCourseSection(section_id) {
		// AHJ: useful for specific-page of my-course page; however, nudge me to answer this question
		// Question: how should the student of the section be obtained? Through another function in this section service (getSectionStudent())
		// OR should we include it in one of the object properties such that ... objectReturned = {course: Course, section: Section, student: Users}

		// Another note: Since the section is stored in the local storage, then maybe this function is deprecated and we can refer to 
		// getCourse(section_id) function in this same service instead?
		const url = this.secUrl;
		let params = new HttpParams().set('id', section_id);

		return this.http.get<any>(url, {
			params: params
		}).pipe(
			map(sections => sections[0]),
			tap(h => {
				const outcome = h ?
					'fetched course ' + section_id : 'did not find course ' + section_id;
			}),
			catchError(this.handleError<Course>(`getCourse course_id=${section_id}`))
		);
	}

	/**
	 * Returns current section to its subscribers
	 * @author Cedric Y. Alvaro
	 * @returns {Section} section information of the current section being navigated
	 */
	getCurrentSection(): Section {
		return new Section(this.currentSection);
	}

	/**
	 * @author Cedric Y. Alvaro
	 * Sets the current coursesection the user is navigating
	 */
	setCurrentCourseSection(cs: any) {
		this.currentCourseSection = cs;
	}

	/**
	 * Returns current section to its subscribers
	 * @author Cedric Y. Alvaro
	 * @returns {any} information of the current course section being navigated
	 */
	getCurrentCourseSection(): any {
		return this.currentCourseSection;
	}

	/**
	 * @author Cedric Y. Alvaro
	 * @description Sets the current section the user is navigating
	 */
	setCurrentSection(section: Section) {
		this.currentSection = section;
	}

	/**
	 * @author Cedric Y. Alvaro
	 * @description Sets the current sectionId for reference of the current section the user is navigating.
	 */
	setCurrentSectionId(section_id: any) {
		this.currentSectionId = section_id;
	}

	/**
	 * Returns current section to its subscribers
	 * @author Cedric Y. Alvaro
	 * @returns {Course} section information of the current section being navigated
	 */
	getCurrentCourse(): Course {
		return this.currentCourse;
	}

	/**
   * Returns students of the section based on section id
   * @description Returns the information of section's enrolled student as provided in the User class.
   * @param section_id id of the section whose array of students are to be retrieved
   * @author Cedric Yao Alvaro
   * @returns {User.ids[]} array of students ids enrolled in the section of User class
   * 
   */
	getSectionStudents(section_id, isAll?: boolean) {
		const url = this.secUrl;
		let params: HttpParams;
		if (isAll) {
			params = new HttpParams()
				.set('students', section_id)
				.set('all', isAll.toString())
		} else {
			params = new HttpParams()
				.set('students', section_id);
		}

		return this.http.get<any>(
			url, {
				params: params
			})
			.pipe(
				tap(students => {
					const outcome = students ?
						'fetched students of section ' + section_id : 'did not find students of section ' + section_id;
				}),
				catchError(this.handleError<any>(`getUserSections section_id=${section_id}`))
			);
	}

	/**
	   * Returns user's array of section grades(or xp).
	 * @param user_id id of the user whose experience points are to be retrieved
	 * @param section_id (optional) id of the section where the student belongs to
	   * 
	   * @returns 
	 * If user's array of experience points from all sections are to be retrieved...
	   * array[i].course_name     - name of the course where the joined quests are obtained 
	   * array[i].section_name    - name of the section where the joined quests are obtained 
	   * array[i].week_total_exp  - array of week accumulative total experience points gained
	   * array[i].max_exp         - section's max experience points in order to obtain a grade of 1.0
	   * 
	 * If user's array of experience points from a specific section are to be retrieved...
	 * week_total_exp           - array of week accumulative total experience points gained
	 * 
	   * @example 
	   * array[i] = {
	   * course_name: "CMSC 128",
	   * section_name: "A",
	   * week_total_exp: [10, 30, 70, 300, 500],
	   * max_exp: 30000
	   * }
	 * 
	 * OR
	 * 
	 * week_total_exp = [10, 30, 70, 300, 500]
	 * 
	   * The expected values of 'week_exp' are based on weekly grades of user and are accumulative
	   * Week_total_exp example:
	   * (total XP points for the following weeks)
	   * Week 1 total exp - 30
	   * Week 2 total exp - 20
	   * Week 3 total exp - 40
	   * Week 4 total exp - 60
	   * Expected week_total_exp array from database - [30, 50, 90, 150] 
	   */
	getUserSectionExp(user_id: string, section_id?: string) {
		//this function is used for general-profile page (all sections) and specific-profile-page (one section)
		let url = this.sectionExpUrl;
		if (section_id) {
			url = this.expUrl;
		}
	}

	/**
	 * Returns the array of sections of an instructor based on user id
	 * @param user_id id of the instructor whose array of sections are to be retrieved
	 * @author Cedric Yao Alvaro
	 * @returns array of sections
	 * array[i].course_name - the name of the section's course where the user is enrolled in
	 * array[i].section     - enrolled sections and pending sections of the student 
	 * 
	 * @example
	 * array[i] = {
	 * course_name: "CMSC 128",
	 * section: section
	 * };
	 * The expected values of array is the section's information and the attached course_name
	 */
	getInstructorSections(user_id) {
		const url = this.secUrl;
		let params = new HttpParams().set('instructor', user_id);

		return this.http.get<Section[]>(
			url, {
				params: params
			})
			.pipe(
				tap(sections => {
					let courseSections: any = sections;

					this.currentUserSections = courseSections.map(courseSection => courseSection.section);
					// added this for referencing
					localStorage.setItem("currentInstructorSections", JSON.stringify(sections));

					const outcome = sections ?
						'fetched sections of user ' + user_id : 'did not find sections of user ' + user_id;
					return sections;
				}),
				catchError(this.handleError<any>(`getUserSections user_id=${user_id}`))
			);
	}

	/**
	 * Returns the array of sections based on user id
	 * @param user_id id of the user whose array of sections are to be retrieved
	 * @author Cedric Yao Alvaro
	 * @returns array of sections
	 * array[i].course_name - the name of the section's course where the user is enrolled in
	 * array[i].section     - enrolled sections and pending sections of the student 
	 * 
	 * @example
	 * array[i] = {
	 * course_name: "CMSC 128",
	 * section: section
	 * };
	 * The expected values of array is the section's information and the attached course_name
	 */
	getUserSections(user_id, section_id?: string): Observable<any[]> {
		const url = this.secUrl;

		let params = new HttpParams().set('id', user_id);
		if (section_id) {
			params = new HttpParams().set('id', user_id)
				.set('section_id', section_id);
		}

		return this.http.get<any>(
			url, {
				params: params
			})
			.pipe(
				tap(sections => {
					this.currentUserSections = sections;
					localStorage.setItem("currentUserSections", JSON.stringify(sections));
					const outcome = sections ?
						'fetched sections of user ' + user_id : 'did not find sections of user ' + user_id;
				}),
				catchError(this.handleError<any>(`getUserSections user_id=${user_id}`))
			);
	}

	/**
	 * Returns the array of enrolled sections of the student
	 * 
	 * @returns array of enrolled sections of the student
	 * array[i].course_name - the name of the section's course where the user is enrolled in
	 * array[i].section     - enrolled sections and pending sections of the student
	 * 
	 * @author Cedric Alvaro
	 * 
	 */
	getUserEnrolledSections() {
		let currentUserId = this.userService.getCurrentUser().getUserId();

		let filter = {
			user_id: [currentUserId],
			status: ["E"]
		}

		let enrolledSections = [];

		if (this.currentUserSections) {
			this.currentUserSections.map((section) => {
				let students = section.section ? section.section.students : section.students;
				if (this.multiFilter(students, filter).length > 0) {
					console.log(section);
					enrolledSections.push(section);
				}
			});
		}

		return enrolledSections;
	}

	/**
	 * Returns the array of enrolled sections of the student
	 * 
	 * @returns array of enrolled sections of the student only section ids
	 * array[i].course_name - the name of the section's course where the user is enrolled in
	 * array[i].section     - enrolled sections and pending sections of the student
	 * 
	 * @author Cedric Alvaro
	 * 
	 */
	getCurrentUserEnrolledSectionIds() {
		let currentUserId = this.userService.getCurrentUser().getUserId();

		let filter = {
			user_id: [currentUserId],
			status: ["E"]
		}

		let enrolledSections = [];

		console.log(this.currentUserSections);

		this.currentUserSections.map((section) => {
			console.log(section.section);
			console.log(section.section.students);
			if (this.multiFilter(section.section.students, filter).length > 0) {
				enrolledSections.push(section.section._id);
			}
		});
		console.log(enrolledSections);

		return enrolledSections;
	}

	/**
	 * Returns the array of joined quests of the user
	 * 
	 * @returns array of joined quests of the user in the said section
	 * array[i].ids = quest_id1...quest_id2...
	 * 
	 * @author Cedric Alvaro
	 * 
	 */
	getAllSectionJoinedQuests() {
		let sjq = [];
		let counter = 0;
		if (this.currentUserSections) {

			this.currentUserSections.map((x) => {
				let quests = x.section ? x.section.quests : x.quests;
				quests.map((y) => {
					if (y.quest_participants) {
						y.quest_participants.map((z) => {
							if (z = this.userService.getCurrentUser().getUserId()) {
								sjq[counter] = y.quest_id;
								counter++;
							}
						})
					}
				})
			});
		}

		return sjq;
	}



	/**
	 * Search section by either its class name or code
	 * @param string it contains the typed class name or code
	 */
	searchSection(string: any): Observable<any> {
		const searchUrl = this.secUrl;
		let params = new HttpParams().set('class', string);

		return this.http.get<Observable<any>>(
			searchUrl, {
				params: params
			})
			.pipe(
				tap(data => {
					const outcome = data ?
						'searched sections ' + string : 'did not find section ' + string;
				}),
				catchError(this.handleError<Observable<any>>(`getUserSections user_id=${string}`))
			);
	}

	/* Below is/are helper functions. */

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}


	/**
	* Filters an array of objects with multiple criteria.
	*
	* @param  array: the array to filter
	* @param  filters: an object with the filter criteria as the property names
	* @author Cedric Yao Alvaro
	* the value of each key is an array with the values to filter:
	* let filters = {
	* 	color: ["Blue", "Black"],
	* 	size: [70, 50]
	* };
	* 
	*/
	multiFilter(array, filters) {
		const filterKeys = Object.keys(filters);
		// filters all elements passing the criteria
		if (array) {
			return array.filter((item) => {
				// dynamically validate all filter criteria
				return filterKeys.every(key => !!~filters[key].indexOf(item[key]));
			});
		} else {
			return [];
		}
	}

	getSortedSections(sections: any[], criteria: SectionSearchCriteria) {
		return sections.sort((a, b) => {
			let firstValue = criteria.sortDirection === 'desc' ? -1 : 1;
			let secondValue = criteria.sortDirection === 'desc' ? 1 : -1;

			let val1: string = "";
			let val2: string = "";
			if (criteria.sortColumn == "courseName") {
				val1 = a["course_name"];
				val2 = b["course_name"];
			} else {
				let query = "";
				if (criteria.sortColumn == "sectionName") {
					query = "section_name";
				} else {
					query = "instructor";
				}
				val1 = a["section"][query];
				val2 = b["section"][query];
			}
			val1 = val1 ? val1.toLowerCase() : val1;
			val2 = val2 ? val2.toLowerCase() : val2;

			if (val1 > val2) {
				return firstValue;
			}
			else if (val1 < val2) {
				return secondValue;
			} else {
				return 0;
			}
		});
	}

}

export class SectionSearchCriteria {
	sortColumn: string;
	sortDirection: string;
}
