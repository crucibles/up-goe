//Core Imports
import {
    HttpClient
} from '@angular/common/http';

import {
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs/Observable';

import {
    Item
} from 'shared/models';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class FileService {

    constructor(
        private http: HttpClient
    ) { }

    readFile(fileName: String): Observable<any> {
        //AHJ: unimplemented; filename must be changed
        return this.http.get('assets/files/quest-map_12345.txt', { responseType: "text" }).pipe(
			catchError(this.handleError<File>(`error getting file <` + fileName + '>'))
		);
    }

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