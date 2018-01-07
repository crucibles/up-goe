//Core Imports
import {
	HttpClient, HttpParams
} from '@angular/common/http';

import {
	Injectable
} from '@angular/core';

//Third-Party Imports
import {
	Observable
} from 'rxjs/Observable';

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
	User
} from 'shared/models';

@Injectable()
export class QuestService {
	/**
	 * Used for accessing/adding/editing/deleting quests
	 */
	private questUrl = "api/quests";

	/**
	 * Used for accessing/editing quests of a section
	 */
	private sectionUrl = "api/sections";

	/**
   * Used for accessing/adding quests in section
   */
	private sectionQuestUrl = "api/sections/quests";

	constructor(
		private http: HttpClient
	) { }

	/**
	 * Adds newly created quest into the database
	 * @param quest quest to be added to the database
	 */
	createQuest(quest) {
		const url = this.questUrl;
	}

	/**
	 * Edits the existing quest found in the database
	 * @param quest new quest information to edit the quest of id found in quest parameter
	 */
	editQuest(quest) {
		const url = this.questUrl;
	}

	/**
	 * Deletes quest in the database
	 * @param quest_id id of the quest to be deleted
	 */
	deleteQuest(quest_id) {
		const url = this.questUrl;
	}

	/**
	 * Adds a quest to the user's list of section quest
	 * @param user_id the id of the student who will be adding a new quest to the section quest list
	 * @param quest_id the id of the quest to be added in the student's section quest list
	 * @param section_id the id of the section the student adding the new section quest belongs to
	 */
	joinQuest(user_id, quest_id, section_id) {
		const url = this.sectionUrl;
	}

	/**
	 * Removes user from the quest participant's list
	 * @param user_id id of user to be removed from quest participant's list
	 * @param quest_id if of the quest where the user's participation will be removed
	 */
	endQuest(user_id, quest_id) {
		const url = this.sectionUrl;
	}

	/**
	 * Submits student's quest submission.
	 * @description Submits the user's submission and removes user from the quest participant's list 
	 * by calling endQuest() 
	 * 
	 * @param idk 
	 * 
	 * @see endQuest
	 */
	submitQuest(idk) {
		//AHJ: Still needs work here! di ko kabalo unsaon ni xD like ang parameter or unsa atung pagsubmit and all
		//AHJ: Idk what url to use
	}

	/**
	 * Lets the student abandon/quit a quest.
	 * @description Let the user abandon the quest, put status ailments on user, 
	 * and removes user from the quest participant's list by calling endQuest()  
	 * 
	 * @param quest_id id of the quest to be abandoned by user
	 * @param user_id id of the student abandoning the quest
	 * 
	 * @see endQuest()
	 */
	abandonQuest(quest_id, user_id) {

	}

	/**
	 * Returns the user's array of joined section quests based on user id
	 * @param user_id id of the user whose list of section quests are to be retrieved
	 * @param section_id id of the section where the student's list of quests are to be retrieved
	 * 
	 * @returns user's array of join section quests 
	 * array[i].course_name - name of the course where the joined quests are obtained 
	 * array[i].section_name - name of the section where the joined quests are obtained 
	 * array[i].weekly_quests - joined section quests of the user
	 * array[i].max_exp - section's max experience points in order to obtain a grade of 1.0
	 * 
	 * @example 
	 * array[i] = {
	 * course_name: "CMSC 128",
	 * section_name: "A",
	 * week_total_exp: [10, 30, 70, 300, 500],
	 * max_exp: 30000
	 * }
	 * 
	 * The expected values of 'week_exp' are based on weekly grades of user and are accumulative
	 * Week_total_exp example:
	 * (total XP points for the following weeks)
	 * Week 1 total exp - 30
	 * Week 2 total exp - 20
	 * Week 3 total exp - 40
	 * Week 4 total exp - 60
	 * Expected array from database - [30, 50, 90, 150] 
	 */
	getUserQuests(user_id): Observable<any> {
		// note: This function is used on the general sidetab except for the profile page

		const url = this.sectionQuestUrl;
		let params = new HttpParams()
			.set('id', user_id)
			.set('method', 'getUserSectionQuests');

		return this.http.get<Quest[]>(this.sectionUrl, {
			params: params
		}).pipe(
			tap(quests => quests ? console.log(quests) : console.log('did not fetched quests')),
			catchError(this.handleError(`getUserSectionQuests`, []))
			);
	}

	/**
	 * Returns the section's array quests
	 * @param section_id id of the section whose array of quests needed to be retrieved
	 */
	getSectionQuest(section_id) {
		// used for quest maps
		const url = this.sectionQuestUrl;
	}

	/**
	 * Grades the student's submitted quest and places it in the database.
	 * @param user_id id of the student whose quest submission is to be graded
	 * @param quest_id id of the student's quest that is to be graded
	 */
	gradeQuest(user_id, quest_id) {

	}

	/**
	 * Returns quest information of a quest with id of quest_id.
	 * @param quest_id id of the quest whose information are to be retrieved
	 * 
	 * @returns quest information
	 */
	getQuestById(quest_id: string): Observable<Quest> {
		const url = `${this.questUrl}/?quest_id=${quest_id}`;
		return this.http.get<Quest>(url).pipe(
			map(quests => quests[0]), // returns a {0|1} element array
			tap(h => {
				const outcome = h ? 'fetched quest ' + quest_id : 'did not find quest ' + quest_id;
				console.log(outcome);
			}),
			catchError(this.handleError<User>(`getQuestById quest_id=${quest_id}`))
		);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation name of the operation that failed
	 * @param result optional value to return as the observable result
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
}
