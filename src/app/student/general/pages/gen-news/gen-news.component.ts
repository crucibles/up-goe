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
    UserService,
    SectionService,
    FileService
} from 'shared/services';

import {
	saveAs
} from 'file-saver';

@Component({
    selector: 'app-gen-news',
    templateUrl: './gen-news.component.html',
    styleUrls: ['./gen-news.component.css']
})
export class GenNewsComponent implements OnInit {

    m: string;
    commentPosts: CommentPost[];
    posters: User[] = [];
    allPostersLoaded: Promise<boolean>[] = [];


    constructor(
        private commentPostService: CommentPostService,
        private pageService: PageService,
        private userService: UserService,
        private sectionService: SectionService,
        private router: Router,
        private fileService: FileService
    ) {
        this.pageService.isProfilePage(false);
    }

    ngOnInit() {
        this.getAllCommentPost();
    }

	/**
	 * Getting the overall commentposts for the student
	 * @description Gets the commentposts of the current user for the general news page
	 * @returns array of commentposts
	 */
    getAllCommentPost() {
        let es = this.sectionService.getCurrentUserEnrolledSectionIds();
        console.log(es);
        this.commentPostService.getUserPosts(es).subscribe(commentPosts => {

            if (commentPosts) {

                this.commentPosts = commentPosts.filter(function (x) {
                    let y = new CommentPost(x);
                    if (y.getIsPost() == true) {
                        return y;
                    }
                });

                // sorts the commentpost by date (from recent 'on top' to oldest)
                this.commentPosts.sort((b, a) => {
                    let x = new CommentPost(a);
                    let y = new CommentPost(b);
                    return this.getTime(x.getPostDate()) - this.getTime(y.getPostDate());
                });

                //gets the poster of each commentpost
                this.commentPosts.forEach((post, index) => {
                    let posts = new CommentPost(post);
                    this.userService.getUser(posts.getUserId()).subscribe(user => {
                        let nextUser = new User(user);
                        this.posters[index] = nextUser;
                        this.allPostersLoaded[index] = Promise.resolve(true);
                    });
                });

                this.commentPosts = this.commentPosts.map(cp => new CommentPost(cp));

            }



        });
    }

	download(fn: any) {
		this.fileService.download(fn).subscribe(res => {
			saveAs(res, fn);
			err => console.warn(err);
		})
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
