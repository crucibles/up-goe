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

  course
  sections: Section[];
  table: any;
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
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userService.getUser(currentUser._id)
      .subscribe(user => {
        this.user = new User(user);
        this.getUserSections(this.user.getUserId());
      });
  }

  /**
   * Obtains status of user's sections
   */
  getStatusOfSection(students) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let status = students.filter(user => user.user_id == currentUser._id)[0].status;
    if (status == "E") {
      return "Enrolled";
    } else if (status == "R") {
      return "Requesting";
    }

  }

  /**
   * Obtains sections and its respective course of the current use
   * @description Obtains sections and its respective course of the current user by storing it to 'courses' 
   * and 'section' array respectively
   * @param user_id id of the user whose array of 
   * @returns an Array of objects with a structure of [{section: {Section}, course_name: Section's course_name}, {...}]
   */
  getUserSections(user_id): void {
    this.sectionService.getUserSections(user_id)
      .subscribe(sections => {
        this.sections = sections;
        //this.sections = sections.map(section => new Section(section));
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
      console.log(this.course_search);
      this.sectionService.searchSection(this.course_search).subscribe((sections) => {
        console.warn(sections);
        this.course_found = sections;
      })
    }
  }

  openSectionPage(section_id: string) {
    console.log(section_id);
    this.router.navigate(['/specific/specific-news', section_id]);
  }


}
