//Core Imports
import {
    Component,
    OnInit
} from '@angular/core';

import {
    Router
} from '@angular/router';

//Application Imports
import {
    CommentPost, 
    User
} from 'shared/models'

import {
    CommentPostService,
    PageService,
    UserService
} from 'shared/services';

@Component({
    selector: 'app-gen-news',
    templateUrl: './gen-news.component.html',
    styleUrls: ['./gen-news.component.css']
})
export class GenNewsComponent implements OnInit {
    m: string;
    commentPosts: CommentPost[];
    posters: User[];
    

    constructor(
        private commentPostService: CommentPostService,
        private pageService: PageService,
        private userService: UserService,
        private router: Router
    ) {
        this.pageService.isProfilePage(false);
    }

    ngOnInit() {
        this.getAllCommentPost();
    }

	/**
	 * Gets the commentposts of the current user
	 * @description Gets the commentposts of current user by adding the obtained commentpost into
	 * 'commentposts' array
	 */
    getAllCommentPost() {
        //AHJ: Unimplemented
        /*this.commentPostService.getSectionPosts("5a3807410d1126321c11e5ee").subscribe(commentPosts => {
            //chooses the commentposts that are main posts (ignores comments)
            this.commentPosts = commentPosts ? commentPosts.filter(post => post.getIsPost() == true) : [];

            //sorts the commentpost by date (from recent 'on top' to oldest)
            this.commentPosts.sort((a, b) => {
                return this.getTime(b.getPostDate()) - this.getTime(a.getPostDate());
            });

            //gets the poster of each commentpost
            this.commentPosts.forEach((post, index) => {
                this.posters = [];
                this.userService.getUser(post.getUserId()).subscribe(user => {
                    //let mname: string = user.getUserId() ? user.getUserMname()[0] + "." : ""
                    this.posters[index] = new User(user);
                });
            });
        });*/
    }



    /*------------Below are the helper functions for this component------------*/

	/**
	 * Redirects user to the section's news page
	 * @param section_id 
	 */
    openSectionPage(section_id: string) {
		this.pageService.openSectionPage(section_id);
	}

	/**
	 * Returns time of the received date; useful for undefined checking 
	 * @param date date whose time is to be retrieved
	 */
    private getTime(date?: Date) {
        date = new Date(date);
        return date != null ? date.getTime() : 0;
    }

	/**
	 * Returns the appropriate datetimestring given a date
	 * @param date date to be formatted
	 * 
	 * @returns dateTime string of the formatted date
     * 
     * @see pageService.formatDateTime()
	 */
    displayTimeDate(date: Date): string {
        let displayDateTime: string = this.pageService.formatDateTime(date);
        return displayDateTime;
    }
}
