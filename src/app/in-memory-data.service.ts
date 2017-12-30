import {
  InMemoryDbService
} from 'angular-in-memory-web-api';

import { Conditions, Badge } from './badge';
import { CommentPost } from './comment-post';
import { Course } from './course';
import { Inventory } from './inventory';
import { Item } from './item';
import { Quest } from './quest';
import { Student, Section } from './section';
import { User } from './user';

/* Mock DB */
export class InMemoryDataService {

  createDb() {
    const badges: Badge[] = [
      {
        badge_id: "111",
        badge_photo: "",
        badge_description: "Rookie Commentor",
        badge_conditions: new Conditions(0, 0, "", "", "", "", "", "", "", "", "", "", "")
      },
      {
        badge_id: "222",
        badge_photo: "",
        badge_description: "Expert Commentor",
        badge_conditions: new Conditions(0, 0, "", "", "", "", "", "", "", "", "", "", "")
      }
    ];

    const commentposts: CommentPost[] = [
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
        post_date: new Date('2018/05/05'),
        commentable: true,
        is_post: true
      },
      {
        post_id: '2',
        section_id: '22',
        user_id: '2',
        post_content: "Comment",
        post_comments: [],
        post_date: new Date('2018/05/05'),
        commentable: true,
        is_post: false
      }
    ];

    const courses: Course[] = [
      {
        course_id: "11",
        course_name: 'CMSC 128',
        course_description: "Fly hiiiiigh",
        sections: ["11", "22", "33"]
      },
      {
        course_id: "22",
        course_name: 'CMSC 141',
        course_description: "Fly hiiiiigh",
        sections: ["11", "22", "33"]
      },
      {
        course_id: "33",
        course_name: 'CMSC 170',
        course_description: "Fly hiiiiigh",
        sections: ["11", "22", "33"]
      },
      {
        course_id: "44",
        course_name: 'NSM 192',
        course_description: "Fly hiiiiigh",
        sections: ["11", "22", "33"]
      }
    ];

    const inventories: Inventory[] = [
      {
        user_id: "1",
        section_id: "11",
        items: ["111", "222"]
      },
      {
        user_id: "1",
        section_id: "22",
        items: ["111", "222"]
      }
    ];

    const items: Item[] = [
      {
        item_id: "111",
        item_type: "W",
        item_name: "wooden sword",
        item_photo: "wsword.png",
        item_description: "Simple but helpful",
        item_hp: "+10",
        item_xp: "100",
        item_ailment: ""
      },
      {
        item_id: "222",
        item_type: "W",
        item_name: "silver helmet",
        item_photo: "shelmet.png",
        item_description: "Protect you from getting brain damaged",
        item_hp: "",
        item_xp: "",
        item_ailment: "cures confusion"
      }
    ];

    const quests: Quest[] = [
      {
        quest_id: 11,
        quest_title: 'Going Bananas!',
        quest_description: 'Retrieve all bananas',
        quest_retakable: true,
        quest_badge: "",
        quest_xp: 1000,
        quest_hp: 10,
        quest_item: [],
        quest_start_time_date: new Date('2017/12/15'),
        quest_end_time_date: new Date('2017/12/22'),
        quest_party: false,
        quest_prerequisite: []
      },
      {
        quest_id: 22,
        quest_title: 'The Rise of the Fallen Dragon',
        quest_description: 'Put the dragon back to sleep',
        quest_retakable: true,
        quest_badge: "",
        quest_xp: 1000,
        quest_hp: 10,
        quest_item: [],
        quest_start_time_date: new Date('2017/12/15'),
        quest_end_time_date: new Date('2017/12/30'),
        quest_party: false,
        quest_prerequisite: []
      },
      {
        quest_id: 23,
        quest_title: 'The Search for the Missing Ring',
        quest_description: "Find Mrs. Chicken's missing ring!",
        quest_retakable: true,
        quest_badge: "",
        quest_xp: 1000,
        quest_hp: 10,
        quest_item: [],
        quest_start_time_date: new Date('2017/12/15'),
        quest_end_time_date: new Date('2017/12/30'),
        quest_party: false,
        quest_prerequisite: []
      }
    ];

    const sections: Section[] = [
      {
        section_id: "11",
        course_id: "11",
        section_name: "A",
        students: [new Student("1", "E"), new Student("2", "E"), new Student("3", "E"), new Student("4", "E")],
        instructor: "Miguel Guillermo"
      },
      {
        section_id: "22",
        course_id: "11",
        section_name: "A",
        students: [new Student("1", "E"), new Student("2", "E"), new Student("3", "E"), new Student("4", "E")],
        instructor: "Miguel Guillermo"
      }
    ];

    const users: User[] = [
      {
        user_id: '1',
        user_fname: 'Donevir',
        user_mname: 'Densing',
        user_lname: 'Hynson',
        user_birthdate: new Date('1997/05/26'),
        user_email: 'ddhynson@up.edu.ph',
        user_password: 'p',
        user_type: 'student',
        user_contact_no: '09499709292',
        user_security_question: 'What is your name?',
        user_security_answer: 'Donevir',
        user_course: ["11", "22"],
        user_quests: ["22", "33"]
      },
      {
        user_id: '2',
        user_fname: 'Cedric',
        user_mname: 'Yao',
        user_lname: 'Alvaro',
        user_birthdate: new Date('1997/08/02'),
        user_email: 'cyalvaron@up.edu.ph',
        user_password: 'c',
        user_type: 'student',
        user_contact_no: '09499709292',
        user_security_question: 'What is your name?',
        user_security_answer: 'Cedric',
        user_course: ["11", "22"],
        user_quests: ["22", "33"]
      }
    ];

    return { badges, commentposts, courses, inventories, items, quests, sections, users };
  }

}
