//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

//Application Imports
import {
  CommentPost
} from '../comment-post'

import {
  CommentPostService
} from '../comment-post.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-specific-news',
  templateUrl: './specific-news.component.html',
  styleUrls: ['./specific-news.component.css']
})
export class SpecificNewsComponent implements OnInit {
  section_id: string;
  private parameters: any;

  commentPosts: CommentPost[];
  comments: CommentPost[][] = [];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  commentContent: string;
  commentObserver: Observer<any>;
  commentObservable: Observable<any> = new Observable(observer =>
    this.commentObserver = observer
  );


  constructor(
    private commentPostService: CommentPostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.parameters = this.route.params.subscribe(params => {
      this.section_id = params['section_id'];
      let subscription = this.commentObservable.subscribe(value => {
        this.appendComments(value);
      });
      this.getAllCommentPosts();
    });
  }

  getAllCommentPosts() {
    this.commentPostService.getSectionPosts(this.section_id).subscribe(commentPosts => {
      this.commentPosts = commentPosts.filter(post => post.is_post == true);
      this.commentPosts.sort((a, b) => {
        return this.getTime(a.post_date) - this.getTime(b.post_date);
      });
      this.getAllComments();
    });
  }

  getAllComments(){
    for (let i = 0; i < this.commentPosts.length; i++) {
      this.comments[i] = [];

      this.commentPosts[i].post_comments.forEach(comment_id => {
        this.commentObserver.next({ parent_index: i, comment_id: comment_id });
      });

      this.comments[i].sort((a, b) => {
        return this.getTime(a.post_date) - this.getTime(b.post_date);
      });
    }
  }

  appendComments(comment_info: any) {
    this.commentPostService.getCommentPostById(comment_info.comment_id)
      .subscribe(comment => {
        console.log("here!");
        this.comments[comment_info.parent_index].push(comment);
      });
  }

  submitComment(parentPostIndex: number) {
    let user_id = "1";
    console.error(new Date());
    let newComment = new CommentPost(this.section_id, user_id, this.commentContent, "", new Date(), true, false);
    this.commentPostService.addCommentPost(newComment).subscribe(comment => {
      console.log(">>>newly added comment");
      console.log(comment);
      this.commentPostService.submitComment(comment, this.commentPosts[parentPostIndex]).subscribe(m => {
        this.commentObserver.next({ parent_index: parentPostIndex, comment_id: comment.id });

        //update checking
        this.commentPostService.getSectionPosts("11").subscribe(commentPosts => {
          console.log("newly updated");
          console.log(commentPosts);
        });
      });
    });

    this.commentContent = ""; //resets the comment
  }







  /* Helper functions */
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

  /**
   * For undefined checking 
   * @param date 
   */
  private getTime(date?: Date) {
    date = new Date(date);
    return date != null ? date.getTime() : 0;
  }

}
