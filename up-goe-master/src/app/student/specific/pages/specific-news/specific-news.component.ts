//Core Imports
import {
	Component,
	OnInit
} from '@angular/core';

import {
	ActivatedRoute
} from '@angular/router';

//Third-part Imports
import {
	Observable
} from 'rxjs/Observable';

import {
	Observer
} from 'rxjs/Observer';

//Application Imports
import {
	CommentPost,
	User
} from 'shared/models'

import {
	CommentPostService,
	UserService,
	PageService
} from 'shared/services';

@Component({
	selector: 'app-specific-news',
	templateUrl: './specific-news.component.html',
	styleUrls: ['./specific-news.component.css']
})



export class SpecificNewsComponent implements OnInit {
	section_id: string;

	commentPosts: CommentPost[];
	comments: CommentPost[][] = [];
	posters: User[] = [];
	currentUser: User;

	/**
	 * 
	 */
	commenters: User[][] = [];
	/**
	 * Comment contents of reply box of posts
	 */
	commentContent: string[] = [];
	commentObserver: Observer<any>;
	commentObservable: Observable<any> = new Observable(observer =>
		this.commentObserver = observer
	);


	constructor(
		private commentPostService: CommentPostService,
		private pageService: PageService,
		private route: ActivatedRoute,
		private userService: UserService
	) { }

	ngOnInit() {
		this.setDefault();
		this.route.paramMap.subscribe(params => {
			console.warn(params);
			this.section_id = params.get('sectionId');
			this.getUser();
			console.log(this.currentUser);
			this.getAllCommentPosts();
			let subscription = this.commentObservable.subscribe(value => {
				this.appendComments(value);
			});
		});
	}

	setDefault() {
		this.pageService.isProfilePage(false);

	}

	getUser() {
		//return this function once working okay
		this.currentUser = new User(JSON.parse(localStorage.getItem("currentUser")));
	}

	/**
	 * Gets the commentposts of the current user
	 * @description Gets the commentposts of current user by adding the obtained commentpost into
	 * 'commentposts' array and adding its respective comments into 'comments' array.
	 * 
	 * @see getAllComments()
	 * @see appendComment()
	 */
	getAllCommentPosts() {
		this.commentPostService.getSectionPosts(this.section_id).subscribe(newCommentPosts => {
			//converts received commentposts into CommentPost class
			if (newCommentPosts) {
				console.warn(newCommentPosts);
				let commentPosts = newCommentPosts.map(posts => new CommentPost(posts));

				//stores only main/parent commentposts to 'commentPosts' variable
				this.commentPosts = commentPosts.filter(post => post.getIsPost() == true);

				//sorts commentPosts chronologically from recent to oldest
				this.commentPosts.sort((a, b) => {
					return this.getTime(b.getPostDate()) - this.getTime(a.getPostDate());
				});

				//obtain users/posters of each commentposts and stores it to 'posters' variable
				this.commentPosts.forEach((post, index) => {
					this.commenters[index] = [];
					this.comments[index]= [];
					this.posters = [];
					this.userService.getUser(post.getUserId()).subscribe(user => {
						console.warn(user);
						let newUser = new User(user);
						this.posters[index] = newUser;
					});
				});
				console.warn(this.posters);
				this.getAllComments();
			}
		});
	}

	/**
	 * Gets the comments of the given (main) commentposts
	 */
	getAllComments() {
		for (let i = 0; i < this.commentPosts.length; i++) {
			this.comments[i] = [];

			this.commentPosts[i].getPostComments().forEach(comment_id => {
				this.commentObserver.next({ parent_index: i, comment_id: comment_id });
			});

			this.comments[i].sort((a, b) => {
				return this.getTime(a.getPostDate()) - this.getTime(b.getPostDate());
			});
		}
	}

	/**
	 * Appends the received comment into 'comments' array
	 * @description Appends the received comment into 'comments' array by obtaining its information using 
	 * the received 'comment_id' from 'comment_info' parameter and add received comment information
	 * to its parent post's comments which is to the 'commentposts' array whose index is 'parent_index'
	 * which is found in 'comment_info' as well
	 * @param comment_info contains the comment_id and parent_index of the to-be-appended comment;
	 * @param comment_info.comment_id id of the comment to be appended
	 * @param comment_info.parent_index the index of the 'commentposts' array where 
	 * the comment is to be appended
	 */
	appendComments(comment_info: any) {
		//obtains the comment with id of comment_info.comment_id
		this.commentPostService.getCommentPost(comment_info.comment_id)
			.subscribe(comment => {
				//obtain user/commenter of the commentpost and stores it to 'commenters' variable
				let newComment = new CommentPost(comment);
				
				this.userService.getUser(newComment.getUserId()).subscribe(user => {
					let newUser = new User(user);

					this.commenters[comment_info.parent_index].push(newUser);
					this.comments[comment_info.parent_index].push(newComment);
				});
			});
	}

	/**
	 * Submits the added comment to a main post
	 * @param parentPostIndex the index of the parent's post where the comment is to be submitted
	 */
	submitComment(parentPostIndex: number) {
		//creates a CommentPost instance of the new comment
		let newComment: CommentPost = new CommentPost();
		newComment.setCommentPost(this.section_id, this.currentUser.getUserId(), this.commentContent[parentPostIndex], "", new Date(), true, false);

		//add comment to the database
		//AHJ: unimplemented; remove this.commentPostService.addCommentPost once attachComment function adds comment to database

		//Note to self: must change appendComment to accomodate comment instead of comment_id for fewer querying
		this.commentPostService.addCommentPost(newComment).subscribe(comment => {

			newComment = new CommentPost(comment);
			this.commentPostService.attachComment(newComment, this.commentPosts[parentPostIndex]).subscribe(() => {
				//appends the comments (by calling appendComment() through commentObserver.next())
				this.commentObserver.next(
					{
						parent_index: parentPostIndex,
						comment_id: newComment.getPostCommentId()
					}
				);
				//update checking
				this.commentPostService.getSectionPosts("5a3807410d1126321c11e5ee").subscribe();
			});
		});

		this.commentContent[parentPostIndex] = ""; //resets the comment
	}

	/* Helper functions */

	/**
	 * Formats the date in datestring of format Month DD, YYYY HH:MM am/pm
	 * @param date Date to be formatted
	 * 
	 * @example "August 2, 1997 11:40 am"
	 */
	private displayTimeDate(date: Date) {
		let displayDateTime: string = this.pageService.formatDateTime(date);
		return displayDateTime;
	}

	/* For undefined checking */
	private getTime(date?: Date) {
		date = new Date(date);
		return date != null ? date.getTime() : 0;
	}
}
