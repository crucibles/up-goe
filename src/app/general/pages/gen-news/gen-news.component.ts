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
  CommentPost
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
  posters: string[];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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
    this.commentPostService.getSectionPosts("5a3807410d1126321c11e5ee").subscribe(commentPosts => {
      //chooses the commentposts that are main posts (ignores comments)
      this.commentPosts = commentPosts ? commentPosts.filter(post => post.is_post == true) : [];

      //sorts the commentpost by date (from recent 'on top' to oldest)
      this.commentPosts.sort((a, b) => {
        return this.getTime(b.post_date) - this.getTime(a.post_date);
      });

      //gets the poster of each commentpost
      this.commentPosts.forEach((post, index) => {
        this.posters = [];
        this.userService.getUser(post.user_id).subscribe(user => {
          let mname: string = user.user_mname ? user.user_mname[0] + "." : ""
          this.posters[index] = user.user_fname + " " + mname + " " + user.user_lname;
        });
      });
    });
  }


  /*Below are the helper functions for this component */

  /**
   * Redirects user to the section's news page
   * @param section_id 
   */
  openClassNewsPage(section_id: string) {
    console.warn(section_id);
    this.router.navigate(['/specific-news', section_id]);
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
   * @see formatDate()
   * @see formatTime()
   */
  displayTimeDate(date: Date): string {
    date = new Date(date);
    let displayDateTime: string = date ?
      this.formatDate(date) + " "
      + this.formatTime(date)
      : "";
    return displayDateTime;
  }

  /**
   * Returns the appropriate datestring given a date object
   * @param date_obj date to be formatted
   * 
   * @returns string of the formatted date
   */
  formatDate(date_obj) {
    var month = this.months[date_obj.getMonth()];
    var day = date_obj.getDate();
    var year = date_obj.getFullYear();
    let datestring: string = month + " " + day + ", " + year;
    return datestring;
  }

  /**
   * Returns the appropriate timestring given a date object
   * @param date_obj date to be formatted
   * 
   * @returns formatted time string
   */
  formatTime(date_obj) {
    // formats a javascript Date object into a 12h AM/PM time string
    var hour = date_obj.getHours();
    var minute = date_obj.getMinutes();
    var amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
      hour -= 12;
    } else if (hour == 0) {
      hour = "12";
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return hour + ":" + minute + amPM;
  }
}
