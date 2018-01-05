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
  courses,
  Quest,
  Section,
  User
} from 'shared/models';

import {
  SectionService,
  UserService,
  PageService
} from 'shared/services';

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
    private pageService: PageService,
    private sectionService: SectionService,
    private userService: UserService,
    private router: Router
  ) {
    this.pageService.isProfilePage(false);
  }

  ngOnInit() {
    this.getUser();
  }
  
  /**
   * Obtains information of the current user
   */
  getUser(): void {
    let currentUserId = JSON.parse(localStorage.getItem("currentUser"));
    this.userService.getUser(currentUserId._id)
      .subscribe(user => {
        this.user = user;
        this.getUserSections(this.user.user_id);
      });
  }
  
    /**
     * Obtains sections and its respective course of the current use
     * @description Obtains sections and its respective course of the current user by storing it to 'courses' 
     * and 'section' array respectively
     * @param user_id id of the user whose array of 
     */
    getUserSections(user_id): void {
      this.sectionService.getUserSections(user_id)
        .subscribe(sections => {
          //stores sections
          this.sections = sections;
          this.courses = [];
          this.sections.forEach((section, index) => {
            this.sectionService.getCourseById(section.course_id).subscribe(course => {
              //stores courses
              this.courses[index] = course;
            })
          });
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
    this.router.navigate(['/specific/specific-news', section_id]);
  }


}
