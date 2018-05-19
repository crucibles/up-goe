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
import { AUTO_STYLE } from '@angular/core/src/animation/dsl';

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
	 * Adds newly created quest into the database
	 * @param quest quest to be added to the database
	 */
	createQuest(quest) {
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
	 * Edits the existing quest found in the database
	 * @param quest new quest information to edit the quest of id found in quest parameter
	 */
	editQuest(quest) {
		const url = this.questUrl;
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
				const outcome = h ? 'fetched quest ' + quest_id : 'did not find quest ' + quest_id;
				console.log(outcome);
			}),
			catchError(this.handleError<User>(`getQuest quest_id=${quest_id}`))
		);
	}

	private getQuestMapDetails(data: String): any {
		var lines: any[] = data.split("\n");
		var i = 0;
		var dataArr: any[] = [];
		var exArr: any[] = [];
		var minX: number = 100;
		var maxX: number = 0;
		var basisY: number = 25;

		let questPoint: any;
		for (i = 0; i < lines.length; i++) {
			var lineData = lines[i].split(",");
			let x: number = parseInt(lineData[2]);
			let y: number = parseInt(lineData[3]);
			minX = minX < x && basisY == y ? minX : x;
			maxX = maxX > x && basisY == y ? maxX : x;

			if (lineData[1] === "scatter") {
				questPoint = {
					questId: lineData[0],
					type: lineData[1],
					x: x,
					y: y,
				}
			} else if (lineData[1] === "line") {
				questPoint = {
					type: lineData[1],
					x: x,
					y: y,
					x1: parseInt(lineData[4]),
					y1: parseInt(lineData[5]),
				}
			} else if (lineData[1] === "exclude") {
				let exclude: any = {
					type: lineData[1],
					x: x,
					y: y,
					direction: lineData[4]
				}
				exArr.push(exclude);
				continue;
			}

			dataArr.push(questPoint);
		}

		var questMapDetails: any = {
			maxX: maxX,
			minX: minX,
			questPositions: dataArr,
			exclude: exArr
		}
		return questMapDetails;
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
	getUserJoinedQuests(user_id: string, section_id?: string): Observable<any> {
		// note: This function is used on the general sidetab except for the profile page

		// used for side tabs; aaaand di ko sure pero basin pwede makuha ang section quest by using getSectionQuests() function
		let params = new HttpParams()
			.set('id', user_id)
			.set('method', 'getUserQuests');

		return this.http.get<Quest[]>(this.sectionQuestUrl, {
			params: params
		}).pipe(
			tap(quests => quests ? console.log(quests) : console.log('did not fetched quests')),
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
	 * Adds a quest to the user's list of section quest
	 * @param user_id the id of the student who will be adding a new quest to the section quest list
	 * @param quest_id the id of the quest to be added in the student's section quest list
	 * @param section_id the id of the section the student adding the new section quest belongs to
	 */
	joinQuest(user_id, quest_id, section_id) {
		const url = this.sectionUrl;
	}

	setQuestMapDataSet(data: String): any[] {
		let questMapDetails = this.getQuestMapDetails(data);

		let exclude: any[] = questMapDetails.exclude;
		let questPositions = questMapDetails.questPositions;
		let minX: number = questMapDetails.minX;
		let maxX: number = questMapDetails.maxX;
		let basisY: number = 25;
		let dataset: any;
		var datasets: any[] = [];

		for (let questPosition of questPositions) {
			if (questPosition.type === "scatter") {
				dataset = {
					type: "scatter",
					label: questPosition.questId,
					data: [{
						x: questPosition.x,
						y: questPosition.y
					}],
					showLine: false
				};
				var scatterPoints: any[] = this.addQuestPlus(questPosition.x, questPosition.y, minX, maxX, basisY, exclude);
				
				if(scatterPoints.length != 0){
					for(let scatterPoint of scatterPoints){
						datasets.push(scatterPoint);
					}
				}
			} else if (questPosition.type === "line") {
				dataset = {
					type: 'line',
					label: 'Line Dataset 1',
					data: [{
						x: questPosition.x,
						y: questPosition.y
					}, {
						x: questPosition.x1,
						y: questPosition.y1
					}],
					fill: false,
					radius: 0
				}
			}

			datasets.push(dataset);

		}

		dataset = {
			type: 'line',
			label: 'Line Dataset 1',
			data: [{
				x: minX,
				y: basisY
			}, {
				x: maxX,
				y: basisY
			}],
			fill: false,
			radius: 0
		}

		datasets.push(dataset);
		console.warn(datasets);
		return datasets;
	}

	addQuestPlus(x: number, y: number, minX: number, maxX: number, basisY: number, exclude: any[]): any[] {
		let scatterPoints: any[] = [];

		let excludedPoints = exclude.filter(data =>
			data.x == x && data.y == y
		);
		let directions = ["N", "S", "E", "W"];
		for (let direction of directions) {
			if (y == basisY && (direction === "W" || (x < maxX && direction == "E"))) {
				continue;
			} else if ((y > basisY && direction === "S") || (y < basisY && direction === "N")) {
				continue;
			} else if (excludedPoints.filter(data => data.x == x && data.y == y && data.direction == direction).length != 0) {
				continue;
			}
			let x1: number = x;
			let y1: number = y;
			if (direction == "N" || direction == "S") {
				y1 = direction === "N" ? y + 2 : y - 2;
			} else {
				x1 = direction === "E" ? x + 2 : x - 2;
			}

			let scatterPoint: any = {
				type: "scatter",
				label: "Add Quest",
				data: [{
					x: x1,
					y: y1
				}],
				showLine: false,
				pointStyle: "cross"
			}

			scatterPoints.push(scatterPoint);
		}

		console.log(scatterPoints);
		return scatterPoints;
	}

	addNewQuestLine(x, y, direction){
		switch(direction){
			case "N":
			break;
			case "W":
			break;
			case "E":
			
			break;
		}
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
