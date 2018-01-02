//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

import {
  NgModel
} from '@angular/forms';

import {
  Router
} from '@angular/router';
//Application Imports
import {
  Course,
  courses
} from '../course';

import {
  Quest
} from '../quest'

import {
  Section
} from '../section';

import {
  SectionService
} from '../section.service';

import {
  User
} from '../user';

import {
  UserService
} from '../user.service';

@Component({
  selector: 'app-gen-selcourse',
  templateUrl: './gen-selcourse.component.html',
  styleUrls: ['./gen-selcourse.component.css']
})
export class GenSelcourseComponent implements OnInit {

  sections: Section[];
  courses: Course[];
  user: User;
  allcourses: Course[];

  //for search bar
  course_search: string;
  isSearching: boolean = false;
  course_found: Course[];

  constructor(
    private userService: UserService,
    private sectionService: SectionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  /**
   * @summary: Obtains courses of the current user and stores it to 'courses' variable
   */
  getUserSections(user_id): void {
    this.sectionService.getUserSections(user_id)
      .subscribe(sections => {
        this.sections = sections;
        this.courses = [];
        this.sections.forEach((section, index) => {
          this.sectionService.getCourseById(section.course_id).subscribe(course => {
            this.courses[index] = course;
          })
        });
      });
  }

  /**
   * @summary: Obtains information of the current user
   */
  getUser(): void {
    this.userService.getUser("5a37f4500d1126321c11e5e7")
      .subscribe(user => {
        this.user = user;
        this.getUserSections(this.user.user_id);
      });
  }

  /**
   * @summary searches the string entered by the user and stores result in 'course_found' variable
   */
  search() {
    if (this.course_search == null || this.course_search.length == 0) {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.course_found = this.getAllCourses().filter(course => (course.course_id == this.course_search) || (course.course_name == this.course_search));
    }
  }

  /**
   * @summary Gets all courses from the database
   * 
   * @returns all courses from the database
   */
  getAllCourses(): Course[] {
    return courses;
  }

  openCoursePage(section_id: string) {
    console.log(section_id);
    this.router.navigate(['/specific-news', section_id]);
  }


}
