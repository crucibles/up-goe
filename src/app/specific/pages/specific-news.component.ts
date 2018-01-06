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
  CommentPost
} from 'shared/models'

import {
  CommentPostService,
  UserService
} from 'shared/services';

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
  posters: string[] = [];
  commenters: string[][] = [];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  commentContent: string[] = [];
  commentObserver: Observer<any>;
  commentObservable: Observable<any> = new Observable(observer =>
    this.commentObserver = observer
  );


  constructor(
    private commentPostService: CommentPostService,
    private userService: UserService,
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

  /**
   * Gets the commentposts of the current user
   * @description Gets the commentposts of current user by adding the obtained commentpost into
   * 'commentposts' array and adding its respective comments into 'comments' array.
   * 
   * @see getAllComments()
   * @see appendComment()
   */
  getAllCommentPosts() {
    this.commentPostService.getSectionPosts(this.section_id).subscribe(commentPosts => {
      this.commentPosts = commentPosts.filter(post => post.getIsPost() == true);
      this.commentPosts.sort((a, b) => {
        return this.getTime(b.getPostDate()) - this.getTime(a.getPostDate());
      });
      this.commentPosts.forEach((post, index) => {
        this.posters = [];
        this.userService.getUser(post.getUserId()).subscribe(user => {
          let firstName: string = user.getUserFname();
          let middleInitial: string = user.getUserMname() ? user.getUserMname()[0] + "." : ""
          let lastName: string = user.getUserLname();
          this.posters[index] = firstName + " " + middleInitial + " " + lastName;
        });
      });
      this.getAllComments();
    });
  }

  /**
   * Gets the comments of the given (main) commentposts
   */
  getAllComments() {
    for (let i = 0; i < this.commentPosts.length; i++) {
      this.comments[i] = [];
      this.commenters[i] = [];

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
    this.commentPostService.getCommentPostById(comment_info.comment_id)
      .subscribe(comment => {
        this.userService.getUser(comment.getUserId()).subscribe(user => {
          let firstName: string = user.getUserFname();
          let middleName: string = user.getUserMname() ? user.getUserMname()[0] + "." : "";
          let lastName: string = user.getUserLname();
          let fullName: string = firstName + " " + middleName + " " + lastName;

          this.commenters[comment_info.parent_index].push(fullName);
          this.comments[comment_info.parent_index].push(comment);
        });
      });
  }

  /**
   * Submits the added comment to a main post
   * @param parentPostIndex the index of the parent's post where the comment is to be submitted
   */
  submitComment(parentPostIndex: number) {
    let user_id = "1";
    let newComment = new CommentPost(this.section_id, user_id, this.commentContent[parentPostIndex], "", new Date(), true, false);

    this.commentPostService.addCommentPost(newComment).subscribe(comment => {
      this.commentPostService.submitComment(comment, this.commentPosts[parentPostIndex]).subscribe(m => {
        this.commentObserver.next(
          {
            parent_index: parentPostIndex,
            comment_id: comment.getPostCommentId()
          }
        );
        //update checking
        this.commentPostService.getSectionPosts("11").subscribe();
      });
    });

    this.commentContent[parentPostIndex] = ""; //resets the comment
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
