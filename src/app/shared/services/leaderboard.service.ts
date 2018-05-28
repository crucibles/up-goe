// Core imports.
import { 
	Injectable 
} from '@angular/core';

import {
	HttpClient
} from '@angular/common/http';

// Third party imports.
import {
    tap
} from 'rxjs/operators';

@Injectable()
export class LeaderboardService {
	private questLeaderboardUrl = "api/questLeaderboard";

	constructor(private http: HttpClient) {}

	getQuestScores(currSection: string, currQuest: string) {
		const url = this.questLeaderboardUrl;
		return this.http.post<null>(url, {currSection, currQuest}).pipe(
			tap(data => {
				console.log(data);
				return data;
			})
		);
	}
}