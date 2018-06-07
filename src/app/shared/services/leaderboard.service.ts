// Core imports.
import { 
	Injectable 
} from '@angular/core';

import {
	HttpClient
} from '@angular/common/http';

// Third party imports.
import {
	catchError,
	tap
} from 'rxjs/operators';

import {
    Observable
} from 'rxjs/Observable';

import {
    of
} from 'rxjs/observable/of';

@Injectable()
export class LeaderboardService {
	private questLeaderboardUrl = "api/questLeaderboard";
	private questTitleUrl = "api/questTitle";

	constructor(private http: HttpClient) {}

	getQuestScores(currSection: string, currQuest: string) {
		const url = this.questLeaderboardUrl;
		return this.http.post<any>(url, {currSection, currQuest}).pipe(
			tap(data => {
				if(data) {
					return data;
				} else {
					return false;
				}
			}),
			catchError(this.handleError<any>(`get leaderboard scores`))
		);
	}

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
}