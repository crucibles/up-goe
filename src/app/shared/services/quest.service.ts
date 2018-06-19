//Core Imports
import {
	HttpClient, HttpParams
} from '@angular/common/http';

import {
	Injectable
} from '@angular/core';

import {
	AUTO_STYLE
} from '@angular/core/src/animation/dsl';

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
	User,
	QuestMap
} from 'shared/models';

import { SectionService } from 'shared/services/section.service';
import { UserService } from 'shared/services/user.service';

@Injectable()
export class QuestService {
	/**
	 * Used for accessing/adding/editing/deleting quests
	 */
	private questUrl = "api/quests";
	/**
	 * Used for accessing/adding/editing/deleting quests
	 */
	private questMapUrl = "api/questmaps";

	/**
	 * Used for accessing/editing quests of a section
	 */
	private sectionUrl = "api/sections";

	private downloadUrl = "api/download";

	/**
	 * Used for accessing/adding quests in section
	 */
	private sectionQuestUrl = "api/sections/quests";


	private experienceUrl = "api/experiences";

	constructor(
		private http: HttpClient,
		private sectionService: SectionService,
		private userService: UserService
	) { }

	/**
	 * Lets the student abandon/quit a quest. Removing the id in the quest participants.
	 * @description Let the student abandon the quest
	 * 
	 * @param quest_id id of the quest to be abandoned by user
	 * @param user_id id of the student abandoning the quest
	 * @author Cedric Alvaro
	 * 
	 */
	abandonQuest(user_id, quest_id, section_id) {

		const url = this.sectionUrl;

		let body = {
			user_id: user_id,
			section_id: section_id,
			quest_id: quest_id,
			abandon: true
		}
		console.warn(body);
		return this.http.post(url, body).pipe(
			tap(data => {
				console.warn(data);
				return data;
			})
		);

	}

	addQuestMapCoordinates(section_id: String, quest_map_id: String, newQuestCoord: any[]): Observable<QuestMap> {
		let url = this.questMapUrl;
		return this.http.post<QuestMap>(url, {
			method: "addQuestMapCoordinates",
			section_id: section_id,
			quest_map_id: quest_map_id,
			quest_coordinates: newQuestCoord
		})
			.pipe(
				tap(data => {
					// Returns data from api.js to spec-quest-map.ts
					return data;
				}),
				catchError(this.handleError<QuestMap>(`createQuest =${quest_map_id}`))
			);
	}

	/**
	 * Adds newly created quest into the database
	 * @param quest quest to be added to the database
	 * @param section_id id of the section where the quest belongs to
	 */
	createQuest(
		section_id,
		quest_title,
		quest_description,
		quest_retakable,
		quest_badge,
		quest_item,
		quest_xp,
		quest_hp,
		quest_start_date,
		quest_end_date,
		quest_party,
		quest_prerequisite
	): Observable<Quest> {
		const url = "api/createQuest";

		return this.http.post<Quest>(url, {
			section_id,
			quest_title,
			quest_description,
			quest_retakable,
			quest_badge,
			quest_item,
			quest_xp,
			quest_hp,
			quest_start_date,
			quest_end_date,
			quest_party,
			quest_prerequisite
		})
			.pipe(
				tap(data => {
					// Returns data from api.js to spec-quest-map.ts
					return data;
				}),
				catchError(this.handleError<Quest>(`createQuest =${quest_title}`))
			);
	}

	/**
	 * Deletes quest in the database
	 * @param quest_id id of the quest to be deleted
	 */
	deleteQuest(quest_id) {
		const url = this.questUrl;
	}

	/**
	 * Edits the existing quest found in the database
	 * @param quest new quest information to edit the quest of id found in quest parameter
	 */
	editQuest(quest) {
		const url = this.questUrl;
	}

	editQuestMapCoordinateAt(section_id, quest_map_id, quest_id, x, y): Observable<any> {
		let url = this.questMapUrl;

		return this.http.post<QuestMap>(url, {
			method: "editQuestMapCoordinateAt",
			section_id: section_id,
			quest_map_id: quest_map_id,
			quest_coordinates: {
				quest_id: quest_id,
				x1: x,
				y1: y,
			}
		})
			.pipe(
				tap(data => {
					// Returns data from api.js to spec-quest-map.ts
					return data;
				}),
				catchError(this.handleError<QuestMap>(`createQuest =${quest_map_id}`))
			);
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
	 * Returns quest information of a quest with id of quest_id.
	 * @param quest_id id of the quest whose information are to be retrieved
	 * 
	 * @returns quest information
	 */
	getQuest(quest_id: string): Observable<Quest> {
		const url = `${this.questUrl}/?quest_id=${quest_id}`;
		return this.http.get<Quest>(url).pipe(
			map(quests => quests[0]), // returns a {0|1} element array
			tap(h => {
				console.log(h);
				const outcome = h ? 'fetched quest ' + quest_id : 'did not find quest ' + quest_id;
			}),
			catchError(this.handleError<User>(`getQuest quest_id=${quest_id}`))
		);
	}

	getSectionQuestMap(section_id): Observable<any> {
		const url = this.questMapUrl;
		let params = new HttpParams()
			.set('section_id', section_id)
			.set('method', 'getSectionQuestMap');

		return this.http.get<any>(url, {
			params: params
		}).pipe(
			tap(quests => quests ? console.log(quests) : console.log('did not fetched quests')),
			catchError(this.handleError(`getUserJoinedSectionQuests`, []))
		);
	}

	/**
	 * Returns the section's array quests
	 * @param section_id id of the section whose array of quests needed to be retrieved
	 */
	getSectionQuests(section_id): Observable<any[]> {
		let params = new HttpParams()
			.set('section_id', section_id)
			.set('method', 'getSectionQuests');

		return this.http.get<Quest[]>('api/getSectionQuests', {
			params: params
		}).pipe(
			tap(quests => quests ? console.log(quests) : console.log('did not fetched quests')),
			catchError(this.handleError(`getUserJoinedSectionQuests`, []))
		);
	}

	/**
	 * Returns the section's array quests
	 * @param section_id id of the section whose array of quests needed to be retrieved
	 */
	getSectionQuest(section_id) {
		return this.sectionService.getCurrentSection().getQuests();
	}

	/**
	 * Returns the user's array of joined section quests based on user id
	 * @param user_id Id of the user whose list of section quests are to be retrieved
	 * @param section_id (optional) Id of the section where the student's list of quests are to be retrieved
	 * 
	 * @returns 
	 * If user's joined quests from all enrolled section are to be retrieved (parameter only contains user_id)... 
	 * 	array[i].course_name 	- {string} name of the course where the joined quests are obtained 
	 * 	array[i].section_name 	- {string} name of the section where the joined quests are obtained 
	 * 	array[i].quests 	- {Quest[]} joined section quests of the user
	 * 
	 * If user's joined quests from a specific section are to be retrieved (parameter contains user_id and section_id)... 
	 * 	quest 			- {Quest[]} joined section quests of the user
	 * 
	 * @example 
	 * array[i] = { //if all enrolled sections
	 * course_name: "CMSC 128",
	 * section_name: "A",
	 * quest: someQuest
	 * }
	 * 
	 * OR
	 * 
	 * array[i].quest = someQuest //if specific section only
	 */
	getUserJoinedQuests(user_id: string): Observable<any> {
		// note: This function is used on the general sidetab except for the profile page
		let userEnrolledSections = this.sectionService.getUserEnrolledSections();
		console.warn(userEnrolledSections);
		let joinedQuestIds = this.sectionService.getAllSectionJoinedQuests();
		console.warn(joinedQuestIds);
		// used for side tabs; aaaand di ko sure pero basin pwede makuha ang section quest by using getSectionQuests() function
		let params = new HttpParams()
			.set('id', user_id)
			.set('method', 'getUserQuests');

		return this.http.get<any[]>(this.sectionQuestUrl, {
			params: params
		}).pipe(
			tap(quests => quests ? console.log(quests) : console.log('did not fetch quests')),
			catchError(this.handleError(`getUserJoinedSectionQuests`, []))
		);
	}

	/**
	 * Grades the student's submitted quest and places it in the database.
	 * @param user_id id of the student whose quest submission is to be graded
	 * @param quest_id id of the student's quest that is to be graded
	 * @param exp experience to grade/give the user on the quest
	 */
	gradeQuest(user_id, quest_id, exp) {

	}

	/**
	 * Determines whether a user has submitted a quest in a particular section
	 * @param user_id the user to verify whether he/she has taken a quest
	 * @param quest_id the section quest to verify whether the student has taken it
	 * @param section_id the section to check whether a user has submitted a quest in this section
	 */
	getQuestExp(user_id, quest_id, section_id): Observable<any> {
		//AHJ: unimplemented
		return null;
	}

	/**
	 * Adds a quest to the user's list of section quest
	 * @param user_id the id of the student who will be adding a new quest to the section quest list
	 * @param quest_id the id of the quest to be added in the student's section quest list
	 * @param section_id the id of the section the student adding the new section quest belongs to
	 */
	joinQuest(user_id, quest_id, section_id) {
		const url = this.sectionUrl;

		let body = {
			user_id: user_id,
			section_id: section_id,
			quest_id: quest_id
		}
		console.warn(body);
		return this.http.post(url, body).pipe(
			tap(data => {
				console.warn(data);
				return data;
			})
		);
	}

	uploadFileForSubmitQuest(x: any) {
		const url = 'api/trial';
		console.warn(x);
		let body = {
			file: x
		};
		console.warn(body);
		return this.http.post(url, body).pipe(
			tap(data => {
				console.warn(data);
				return data;
			})
		);
	}

	setMaxEXP(questMapId: String, maxEXP: number) {
		const url = this.questMapUrl;

		let body = {
			method: "setMaxEXP",
			quest_map_id: questMapId,
			max_exp: maxEXP
		}

		return this.http.post(url, body).pipe(
			tap(data => {
				console.warn(data);
				return data;
			})
		);
	}

	/**\
	 * Submits student's quest submission.
	 * @description Submits the user's submission and removes user from the quest participant's list 
	 * by calling endQuest() 
	 * 
	 * @param data: is composed of the upload name and original name of the file. 
	 * 
	 * @see endQuest
	 */
	submitQuest(data: any, comment: string, user_id, quest_id, section_id) {
		const url = this.sectionUrl;

		let body = {
			method: "submitQuest",
			user_id: user_id,
			section_id: section_id,
			quest_id: quest_id,
			data: data? data.uploadName: "",
			comment: comment,
			time: data && data.uploadName ? Number(data.uploadName.substring(0, data.uploadName.indexOf('.'))) : Date.now()
		}

		console.warn(body.data);
		return this.http.post(url, body).pipe(
			tap(data => {
				console.warn(data);
				return data;
			})
		);
	}

	downloadQuestSubmitted(fileName: string) {
		const url = this.downloadUrl;

		let params = new HttpParams().set('file', fileName);

		return this.http.get(url, {
			params: params
		}).pipe(
			tap(data => {
				console.warn(data);
				return data;
			})
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
