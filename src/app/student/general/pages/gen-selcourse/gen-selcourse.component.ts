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

import {
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router/src/router_state';

import {
  ToastsManager
} from 'ng2-toastr/src/toast-manager';
import { AsyncAction } from 'rxjs/scheduler/AsyncAction';

@Component({
  selector: 'app-gen-selcourse',
  templateUrl: './gen-selcourse.component.html',
  styleUrls: ['./gen-selcourse.component.css']
})
export class GenSelcourseComponent implements OnInit {

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
    private router: Router,
    private toastr: ToastsManager
  ) {
    this.pageService.isProfilePage(false);
  }

  ngOnInit() {
    let url = this.router.routerState.snapshot.url.split("/");
    //add toaster or warning to student what happened why redirected here
    console.log(url[2]);
    if (url[2] == "specific") {
      this.pageService.isProfilePage(false);
      this.router.navigateByUrl('student/general/select-course');
      this.toastr.info("Invalid accessing the specific page of the inputted id!", "Info")
    }
    this.getUser();
  }

  /**
   * Obtains information of the current user
   */
  getUser(): void {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userService.getUser(currentUser._id)
      .subscribe(user => {
        console.warn(user);
        this.user = new User(user);
        this.getUserSections(this.user.getUserId());
      });
  }

  /**
   * Obtains status of user's sections
   */
  getStatusOfSection(students) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let student = students ? students.filter(user => user.user_id == currentUser._id) : AsyncAction;
    let status = student[0] ? student[0].status : "";

    if (status == "E") {
      return "Enrolled";
    } else if (status == "R") {
      return "Requesting";
    } else {
      return "Open";
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
        console.warn(sections);
        this.sections = sections;
        this.sectionService.setCurrentUserSections(sections);
      });
  }

  /**
   * @summary searches the string entered by the user and stores result in 'course_found' variable
   */
  search() {
    console.warn(this.sections);
    if (this.course_search == null || this.course_search.length == 0) {

      this.isSearching = false;

    } else if (this.course_search.length == 24) {
      console.log("id");
      this.isSearching = true;
      this.sectionService.searchSection(this.course_search).subscribe((sections) => {
        this.course_found = sections;
      })

    } else if (this.course_search.length > 0) {
      console.log(">0");
      this.sectionService.searchSection(this.course_search).subscribe((sections) => {
        console.warn(sections);
        this.isSearching = true;
        this.course_found = sections;
      })

    }

  }

  openSectionPage(section_id: string) {
    this.pageService.openSectionPage(section_id);
  }

  /**
 * @description portal for post requests that regards to sections "api/sections"
 * @author Cedric Yao Alvaro
 * 
 * 1. Student requestin to enroll in a section
 */
  requestToEnroll(section_id: string) {
    console.warn("requesting");
    this.sectionService.sendRequestToSection(this.user.getUserId(), section_id).subscribe((section) => {
      this.getUserSections(this.user.getUserId());
      this.course_search = null;
      this.search();
    });
  }


}
