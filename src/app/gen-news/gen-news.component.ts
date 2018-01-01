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
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllCommentPost();
  }

  getAllCommentPost() {
    this.commentPostService.getSectionPosts("11").subscribe(commentPosts => {
      this.commentPosts = commentPosts.filter(post => post.is_post == true);
      this.commentPosts.forEach((post, index)=>{
        this.posters = [];
        this.userService.getUserById(post.user_id).subscribe(user => {
          let mname: string = user.user_mname? user.user_mname[0] + ".": ""
          this.posters[index] = user.user_fname + " " + mname + " " + user.user_lname;
        });
      });
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

  formatDate(date_obj) {
    var month = this.months[date_obj.getMonth()];
    var day = date_obj.getDate();
    var year = date_obj.getFullYear();
    let datestring: string = month + " " + day + ", " + year;
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
    console.warn(section_id);
    this.router.navigate(['/specific-news', section_id]);
  }

}
