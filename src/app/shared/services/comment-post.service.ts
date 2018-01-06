//Core Imports
import {
  HttpClient,
  HttpHeaders
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
  CommentPost
} from 'shared/models'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CommentPostService {

  constructor(
    private http: HttpClient
  ) { }

  private postUrl = "api/commentposts";

  /**
   * Adds the received comment to a parent commentpost in the database
   * @description Adds the received commentpost as a comment to a parent commentpost in the database
   * by adding the comment's id to the post_comment attribute of the parent commentpost
   * @param main_post_id id of the parent post where the comment will be added
   * @param comment the comment to be added to the parent post
   */
  addCommentPost(comment: CommentPost): Observable<CommentPost> {
    return this.http.post<CommentPost>(this.postUrl, comment, httpOptions).pipe(
      tap((commentPost: CommentPost) =>
        console.log("comment " + comment.getPostContent() + " is added")),
      catchError(this.handleError<CommentPost>('addComment'))
    );
  }
  // Should we also put error checking to know if main post is commentable or not... 
  //however, this could be done in the Component side... so error checking here kay madouble lang... 
  //in case, wla naquery ug tarung ang main post tapos wla niya na block ang comments

  /**
     * Submits the received comment to a parent commentpost in the database
     * @description Submits the received commentpost by adding it as a comment to a parent commentpost 
     * in the database which is done by merely adding the comment's id to the post_comment attribute of 
     * the parent commentpost, thus, editing the 'comments' attribute of parent commentpost
     * @param main_post_id id of the parent post where the comment will be added
     * @param comment the comment to be added to the parent post
     */
  submitComment(comment: CommentPost, mainPost: CommentPost): Observable<CommentPost> {
    // Should we also put error checking to know if main post is commentable or not... 
    //however, this could be done in the Component side... so error checking here kay madouble lang... 
    //in case, wla naquery ug tarung ang main post tapos wla niya na block ang comments
    //let newCommentObservable: Observable<CommentPost>;
    mainPost.getPostComments().push(comment.getPostCommentId());
    console.log("comment.id");
    console.log(mainPost);
    return this.http.put<CommentPost>(this.postUrl, mainPost, httpOptions).pipe(
      tap(_ => {
        console.log(`updated post id=${mainPost.getPostCommentId()}`);
      }),
      catchError(this.handleError<CommentPost>('submitComment'))
    );
  }




  /**
   * Obtains the posts from a section based on section's id.
   * @param section_id section id of the section whose posts are to be retrieved
   * 
   * @returns commentpost array of the chosen section
   */
  getSectionPosts(section_id: string): Observable<CommentPost[]> {
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
   * Obtains the posts from a section based on section's id.
   * @param section_id section id of the section whose posts are to be retrieved
   * 
   * @returns commentpost array of the chosen section
   */
  getCommentPostById(postId: number): Observable<CommentPost> {
    const url = `${this.postUrl}/?id=${postId}`;
    return this.http.get<CommentPost>(url).pipe(
      map(posts => posts[0]), // returns a {0|1} element array
      /*tap(h => {
        const outcome = h ? 'fetched post #' + postId : 'did not find post #' + postId;
        console.log(outcome);
      }),*/
      catchError(this.handleError<CommentPost>(`getCommentPostById id=${postId}`))
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
