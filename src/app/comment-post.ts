/**
 * A class to represent commentposts
 * @class
 *
 * @property post_id identification for a commentpost
 * @property section_id identifies which section the post belongs to
 * @property user_id id of the user who posted the commentpost
 * @property post_content content of the post
 * @property post_comments[] array of postcomment replies of the commentpost
 * @property post_date date the commentpost was posted
 * @property commentable identifies if a post is commentable or not; 
 *  true if commentable and false if otherwise
 * @property is_post identifies if a commentpost is a post or a comment; 
 *  true if it is a post (a parent post) and false if it is a comment
 */
export class CommentPost {
    post_id: string;
    section_id: string;
    user_id: string;
    post_content: string;
    post_comments: string[];
    post_date: Date;
    commentable: boolean;
    is_post: boolean;
};


export const commentposts: CommentPost[]= [
    {
      post_id: '1',
      section_id: '11',
      user_id: '1',
      post_content: "Bootdey is a gallery of free snippets resources templates and utilities for bootstrap css hmtl js framework. Codes for developers and web designers",
      post_comments: ["2"],
      post_date: new Date('2018/05/26'),
      commentable: true,
      is_post: true
    },
    {
      post_id: '3',
      section_id: '11',
      user_id: '1',
      post_content: "Bootdey is a gallery of free snippets resources templates and utilities for bootstrap css hmtl js framework. Codes for developers and web designers",
      post_comments: ["2"],
      post_date: new Date('2018/05/26'),
      commentable: true,
      is_post: true
    },
    {
      post_id: '2',
      section_id: '22',
      user_id: '2',
      post_content: "Comment",
      post_comments: [],
      post_date: new Date('2018/05/26'),
      commentable: true,
      is_post: false
    }
  ];

