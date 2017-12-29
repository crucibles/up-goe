//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

//Application Imports
import {
  CommentPost
} from '../comment-post'

import {
  CommentPostService
} from '../comment-post.service';

@Component({
  selector: 'app-gen-news',
  templateUrl: './gen-news.component.html',
  styleUrls: ['./gen-news.component.css']
})
export class GenNewsComponent implements OnInit {

  commentPosts: CommentPost[];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(
    private commentPostService: CommentPostService
  ) { }

  ngOnInit() {
    this.getAllCommentPost();
  }

  getAllCommentPost() {
    this.commentPostService.getSectionPosts("11").subscribe(commentPosts => {
      this.commentPosts = commentPosts;
      //.filter(post => post.is_post == true);
    });
  }

  displayTimeDate(date: Date) {
    date = new Date(date);
    let displayDateTime: string = date ?
      this.formatDate(date) + " "
      + this.formatTime(date)
      : "";
    return displayDateTime;
  }

  formatDate(date_obj: Date) {
    date_obj = new Date(date_obj);
    let datestring: string = this.months[date_obj.getMonth() - 1] + " "
      + date_obj.getDay() + ", "
      + date_obj.getFullYear();
    console.log(datestring);
    return datestring;
  }

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

  openCoursePage(section_id: string) {
    console.log(section_id);
  }

}
