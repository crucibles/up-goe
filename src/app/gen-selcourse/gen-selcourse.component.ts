//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

import {
  NgModel
} from '@angular/forms';

//Application Imports
import {
  Course,
  courses
} from '../course';

import {
  Quest
} from '../quest'

import {
  User
} from '../user';  

import {
  UserService
} from '../user.service';  
import { SectionService } from '../section.service';
import { Section } from '../section';

@Component({
  selector: 'app-gen-selcourse',
  templateUrl: './gen-selcourse.component.html',
  styleUrls: ['./gen-selcourse.component.css']
})
export class GenSelcourseComponent implements OnInit {
  
  sections: Section[];
  user: User;
  allcourses: Course[];
  
  //for search bar
  course_search: string;
  isSearching: boolean = false; 
  course_found: Course[];
  
  constructor(
    private userService: UserService,
    private sectionService: SectionService
  ) {}
  
  ngOnInit() {
    this.getCourses();
    this.getUser();
  }
  
  /**
   * @summary: Obtains courses of the current user and stores it to 'courses' variable
   */
  getCourses(): void {
    //ced test id
    this.sectionService.getUserSections("5a37f4500d1126321c11e5e7")
    .subscribe(sections => {
      this.sections = sections
      console.log("sections: array HER");
      console.log(sections);
    });
  }

  /**
   * @summary: Obtains information of the current user
   */
  getUser(): void {
    this.userService.getUserById("1")
      .subscribe(user => this.user = user);
  }
  
  /**
   * @summary searches the string entered by the user and stores result in 'course_found' variable
   */
  search() {
    console.log(this.course_search);
    if(this.course_search == null || this.course_search.length == 0){
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
  getAllCourses(): Course[]{
    return courses;
  }


}
