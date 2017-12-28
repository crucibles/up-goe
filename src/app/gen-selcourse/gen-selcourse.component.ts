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
  Quest,
  quests
} from '../quest'

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
  
  courses: Course[];
  user: User;
  allcourses: Course[];
  
  //for search bar
  course_search: string;
  isSearching: boolean = false; 
  course_found: Course[];
  
  constructor(
    private userService: UserService
  ) {}
  
  ngOnInit() {
    this.getCourses();
    this.getUser();
  }
  
  /**
   * @summary: Obtains courses of the current user and stores it to 'courses' variable
   */
  getCourses(): void {
    this.userService.getCourses()
    .subscribe(courses => this.courses = courses);
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
