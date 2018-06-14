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
	Student
} from 'shared/models'

import {
	SectionService
} from './section.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CommentPostService {

	constructor(
		private http: HttpClient,
		private sectionService: SectionService
	) { }

	/**
	 * Used for editing/adding/accessing commentposts from server
	 */
	private postUrl = "api/posts";

	/**
	 * Used for obtaining all posts from all sections where the student is enrolled in 
	 */
	private sectionPostUrl = "api/sections/posts";

	/**
	 * Adds the received commentpost in the database
	 * @param comment The commentpost to be added to the database
	 */
	addCommentPost(comment: CommentPost): Observable<CommentPost> {
		const url = this.postUrl;

		let body = {
			method: "addCommentPost",
			section_id: comment.getSectionId(),
			user_id: comment.getUserId(),
			post_content: comment.getPostContent(),
			post_comments: comment.getPostComments(),
			post_date: comment.getPostDate(),
			commentable: comment.getCommentable(),
			is_post: comment.getIsPost(),
			data: comment.getPostData()
		};

		return this.http.post<CommentPost>(this.postUrl, body).pipe(
			tap((commentPost: CommentPost) =>
				console.log("comment " + comment.getPostContent() + " is added")),
			catchError(this.handleError<CommentPost>('addComment'))
		);
	}

	/**
	   * Submits the received comment to a parent commentpost in the database and add new comment as commentpost to the database
	   * @description Submits the received commentpost by adding it as a comment to a parent commentpost 
	   * in the database which is done by merely adding the comment's id to the post_comment attribute of 
	   * the parent commentpost, thus, editing the 'comments' attribute of parent commentpost. The function also
	   * adds the received 'comment' parameter to the database 
	   * @param comment The comment to be added to the parent post
	   * @param mainPostId Id of the parent post where the comment will be added
	   * 
	   * @returns {CommentPost} comment - the newly added comment along with the newly-made id 
	   */
	attachComment(comment: CommentPost, mainPostId: String): Observable<CommentPost> {
		// Should we also put error checking to know if main post is commentable or not... 
		//however, this could be done in the Component side... so error checking here kay madouble lang... 
		//in case, wla naquery ug tarung ang main post tapos wla niya na block ang comments
		const url = this.postUrl;

		let body = {
			method: "attachComment",
			section_id: comment.getSectionId(),
			user_id: comment.getUserId(),
			post_content: comment.getPostContent(),
			post_comments: comment.getPostComments(),
			post_date: comment.getPostDate(),
			commentable: comment.getCommentable(),
			is_post: comment.getIsPost(),
			main_post_id: mainPostId
		};

		return this.http.post<CommentPost>(this.postUrl, body).pipe(
			tap(_ => {
				console.log(`updated post id=${mainPostId}`);
			}),
			catchError(this.handleError<CommentPost>('addComment'))
		);
	}

	/**
	 * Edits existing commentpost in the database 
	 * @description Edit old information of existing commentpost of id contained in the commentpost parameter with the 
	 * new commentpost received in the parameter
	 * @param commentPost New information to replace the existing comment in the database
	 * - comment._id - id of the commentpost in order to identify which commentpost to edit
	 */
	editCommentPost(commentPost: CommentPost) {
		const url = this.postUrl;
	}

	/**
	 * Deletes comment from post 
	 * @description Deletes comment from its parent post's comments and removes the commentpost from the database
	 * @param commentId id of the commentpost in order to identify which commentpost to delete
	 */
	deleteComment(commentPost: CommentPost) {
		const url = this.postUrl;
	}

	/**
	 * Deletes existing commentpost in the database
	 * @param commentId id of the commentpost in order to identify which commentpost to delete
	 */
	deleteCommentPost(commentId: string) {
		const url = this.postUrl;
	}

	/**
	 * Obtains the posts from a section based on section's id.
	 * @param section_id section id of the section whose posts are to be retrieved
	 * 
	 * @returns commentpost array of the chosen section
	 */
	getCommentPost(postId: number): Observable<CommentPost> {
		const url = this.postUrl;

		//const url = `${this.postUrl}/?id=${postId}`;
		return this.http.get<CommentPost>(url).pipe(
			map(posts => posts[0]), // returns a {0|1} element array
			/*tap(h => {
			  const outcome = h ? 'fetched post #' + postId : 'did not find post #' + postId;
			  console.log(outcome);
			}),*/
			catchError(this.handleError<CommentPost>(`getCommentPost id=${postId}`))
		);
	}

  /**
   * Obtains the posts from a section based on section's id.
   * @param section_id section id of the section whose posts are to be retrieved
   * 
   * @returns {CommentPost[]} commentpost array of the chosen section
   */
  getSectionPosts(section_id: string): Observable<CommentPost[]> {
    const url = this.postUrl;

    let params = new HttpParams()
      .set('section_id', section_id)
      .set('method', "getSectionPosts");

    return this.http.get<CommentPost[]>(url, {
      params: params
    }).pipe(
      tap(h => {
        const outcome = h ? 'fetched section ' + section_id : 'did not find section ' + section_id;
        console.log(outcome);
      }),
      catchError(this.handleError<CommentPost[]>(`getSectionPosts section_id=${section_id}`))
    );
  }

  /**
   * Obtains all posts from all sections the user is enrolled in
   * @param sections info needed about the user sections
   * 
   * @returns commentpost array of the enrolled sections of the user
   */
  getUserPosts(sections: any): Observable<CommentPost[]> {
    const url = this.postUrl;
		
    let params = new HttpParams()
			.set('sections', sections);
			
		console.log(sections);

    return this.http.get<CommentPost[]>(url, {
      params: params
    }).pipe(
      tap(posts => {
        const outcome = posts ? 'fetched commentposts ' + sections : 'did not find commentposts ' + sections;
        console.log(outcome);
      }),
      catchError(this.handleError<CommentPost[]>(`getSectionPosts section_id=${sections}`))
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
