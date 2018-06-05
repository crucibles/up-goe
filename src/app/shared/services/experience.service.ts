//Core Imports
import {
    HttpClient,
    HttpHeaders,
    HttpParams
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
    CommentPost,
    Student,
    Experience
} from 'shared/models'

import {
    SectionService
} from './section.service';
import { urlencoded } from 'express';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ExperienceService {

    private experienceUrl: string = "api/experiences";

    constructor(
        private http: HttpClient
    ) { }

    /**
     * 
     * @param section_id the id of the section whose student grades are to be retrieved
     * @param user_id (optional) Gets the section grade for a particular student
     */
    getSectionGrades(section_id: string, user_id?: string): Observable<any> {
        const url = this.experienceUrl;
        let params = new HttpParams()
            .set('section_id', section_id)
            .set('method', 'getSectionGrades');
        if (user_id) {
            params.set('user_id', user_id);
        }

        return this.http.get<any>(url, {
			params: params
		}).pipe(
			tap(quests => quests ? console.log(quests) : console.log('did not fetched quests')),
			catchError(this.handleError(`getSectionGrades`, []))
		);
    }

    setStudentQuestGrade(section_id, user_id, quest_id, grade){
        let url = this.experienceUrl;
        console.log("SERVICEsetgrade");
        console.log(section_id);
        console.log(user_id);
        console.log(quest_id);
        console.log(grade);
		return this.http.post<Experience>(url, {
			method: "setStudentQuestGrade",
			section_id: section_id,
			user_id: user_id,
            quest_id: quest_id,
            grade: grade 
		})
			.pipe(
				tap(data => {
					// Returns data from api.js
					return data;
				}),
				catchError(this.handleError<Experience>(`setStudentQuestGrade =${quest_id}`))
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