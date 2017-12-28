//Core Imports
import { Component, OnInit } from '@angular/core';

//Application Imports
import { CommentPost } from '../comment-post'
import { CommentPostService } from '../comment-post.service';

@Component({
  selector: 'app-gen-news',
  templateUrl: './gen-news.component.html',
  styleUrls: ['./gen-news.component.css']
})
export class GenNewsComponent implements OnInit {

  commentPosts: CommentPost[];

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

}
