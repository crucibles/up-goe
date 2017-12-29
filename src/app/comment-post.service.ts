//Core Imports
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
  CommentPost
} from './comment-post'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentPostService {

  constructor(
    private http: HttpClient
  ) { }

  private postUrl = "api/commentposts";

  /**
   * Obtains the posts from a section based on section's id.
   * @param section_id section id of the section whose posts are to be retrieved
   * 
   * @returns commentpost array of the chosen section
   */
  getSectionPosts(section_id: string): Observable<CommentPost[]>{
    const url = `${this.postUrl}/?section_id=${section_id}`;
    return this.http.get<CommentPost[]>(url).pipe(
      tap(h => {
        const outcome = h ? 'fetched section ' + section_id: 'did not find section ' + section_id;
        console.log(outcome);
      }),
      catchError(this.handleError<CommentPost[]>(`getSectionPosts section_id=${section_id}`))
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
