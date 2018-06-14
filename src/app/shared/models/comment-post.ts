/**
 * A class to represent commentposts
 * @class
 *
 * @property post_id identification for a commentpost
 * @property section_id identifies which section the post belongs to
 * @property user_id id of the user who posted the commentpost
 * @property post_content content of the post
 * @property post_comments[] array of postcomment comment's ids of the commentpost
 * @property post_date date the commentpost was posted
 * @property commentable identifies if a post is commentable or not; 
 *  true if commentable and false if otherwise
 * @property is_post identifies if a commentpost is a post or a comment; 
 *  true if it is a post (a parent post) and false if it is a comment
 */
export class CommentPost {
  private _id: string;
  private section_id: string;
  private user_id: string;
  private post_content: string;
  private post_comments: string[];
  private post_date: Date;
  private commentable: boolean;
  private is_post: boolean;
  private data: string;

  constructor(
    commentPost?: any
  ) {
    if (commentPost) {
      this._id = commentPost._id;
      this.section_id = commentPost.section_id? commentPost.section_id: "";
      this.user_id = commentPost.user_id? commentPost.user_id: "";
      this.post_content = commentPost.post_content? commentPost.post_content: "";
      this.post_comments = commentPost.post_comments? commentPost.post_comments: [];
      this.post_date = commentPost.post_date? new Date(commentPost.post_date): new Date();
      this.commentable = commentPost.commentable? commentPost.commentable: true;
      this.is_post = commentPost.is_post? commentPost.is_post: false;
      this.data = commentPost.data? commentPost.data: "";
    } else {
      this.section_id = "";
      this.user_id = "";
      this.post_content = "";
      this.post_comments = [];
      this.post_date = new Date();
      this.commentable = true;
      this.is_post = false;
      this.data = "";
    }
  }

  setCommentPost(
    section_id,
    user_id,
    post_content,
    post_comments,
    post_date,
    commentable,
    is_post,
    data
  ) {
    this.section_id = section_id;
    this.user_id = user_id;
    this.post_content = post_content;
    this.post_comments = post_comments;
    this.post_date = post_date;
    this.commentable = commentable;
    this.is_post = is_post;
    this.data = data;
  }

  getPostCommentId() {
    return this._id;
  }

  getPostData() {
    return this.data;
  }

  getUserId() {
    return this.user_id;
  }

  getPostContent() {
    return this.post_content;
  }

  getPostComments() {
    return this.post_comments;
  }

  getPostDate() {
    return this.post_date;
  }

  getCommentable() {
    return this.commentable;
  }

  getIsPost() {
    return this.is_post;
  }

  getSectionId(){
    return this.section_id;
  }

  setCommentPostId(_id) {
    this._id = _id;
  }

  setCommentPoster(user_id) {
    this.user_id = user_id;
  }

  setPostContent(post_content) {
    this.post_content = post_content;
  }

  setPostComments(post_comments) {
    this.post_comments = post_comments;
  }

  setPostDate(post_date) {
    this.post_date = post_date;
  }

  setCommentable(commentable) {
    this.commentable = commentable;
  }

  setIsPost(is_post) {
    this.is_post = is_post;
  }

  setSectionId(section_id){
    this.section_id = section_id;
  }


};