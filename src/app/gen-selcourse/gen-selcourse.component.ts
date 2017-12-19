import {
  Component,
  OnInit
} from '@angular/core';

import {
  UserService
} from '../user.service';

import {
  User
} from '../user';

import {
  Course,
  ALLCOURSES
} from '../course';

import {
  Quest,
  QUESTS
} from '../quest'

import {
  NgModel
} from '@angular/forms';

@Component({
  selector: 'app-gen-selcourse',
  templateUrl: './gen-selcourse.component.html',
  styleUrls: ['./gen-selcourse.component.css']
})
export class GenSelcourseComponent implements OnInit {

  courses: Course[];
  quests: Quest[];
  user: User;
  course_search: string;
  timePerc: number[];
  pb_width: string = '50%'; //width of the progress bar
  questTimePercentage: string[];
  questTimeDisplay: string[];
  progressBarClass: string[];
  defaultPBClass: string = 'progress-bar progress-bar-striped active';
  isSearching: boolean = false; 
  allcourses: Course[];
  course_found: Course[];


  constructor(private userService: UserService) {
  }

  getCourses(): void {
    this.userService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  getQuests(): void {
    this.quests = QUESTS;
    this.timeDisplays();
  }

  timeDiff(date1: Date, date2: Date): number {
    let time1 = date1.getTime();
    let time2 = date2.getTime();
    let diffInMs: number = time1 - time2;
    return diffInMs;
  }

  timeDisplays() {
    this.questTimeDisplay = [];
    this.questTimePercentage = [];
    let string: string = "";
    setInterval(() => {
      for (let i = 0; i < this.quests.length; i++) {
        let timePerc: number = 100 - this.timeDiff(this.quests[i].quest_end_time_date, new Date()) / this.timeDiff(this.quests[i].quest_end_time_date, this.quests[i].quest_start_time_date) * 100;

        let totalMinRem: number = this.timeDiff(this.quests[i].quest_end_time_date, new Date());
        let hourRem: number = Math.floor(totalMinRem / 1000 / 60 / 60);
        this.toggleClass(hourRem, i);
        if (totalMinRem <= 0) {
          timePerc = 100;
          string = "Time's up!";
        } else if (hourRem >= 168) {
          let weekRem: number = Math.floor(totalMinRem / 1000 / 60 / 60 / 128);
          let dayRem = Math.floor(totalMinRem / 1000 / 60 / 60 % 128);
          string = weekRem.toString() + " wk(s) & " + dayRem.toString() + " dy(s) left";
        } else if (hourRem >= 24) {
          let dayRem: number = Math.floor(totalMinRem / 1000 / 60 / 60 / 24);
          hourRem = Math.floor(totalMinRem / 1000 / 60 / 60 % 24);
          string = dayRem.toString() + " dy(s) & " + hourRem.toString() + " hr(s) left";
        } else {
          let minRem: number = Math.floor(totalMinRem / 1000 / 60 % 60);
          string = hourRem.toString() + " hr(s) & " + minRem.toString() + " mn(s) left";
        }

        this.questTimeDisplay[i] = string;
        this.questTimePercentage[i] = timePerc.toString() + '%';
      }
    }, 1000);
  }

  toggleClass(hourRem, i) {
    this.progressBarClass = [];
    if (hourRem <= 24) {
      this.progressBarClass[i] = 'progress-bar-danger';
    } else {
      this.progressBarClass[i] = 'progress-bar-success';
    }
  }

  logout() {
  }

  search() {
    console.log(this.course_search);
    if(this.course_search == null || this.course_search.length == 0){
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.getAllCourses();
      this.course_found = this.allcourses.filter(course => (course.c_code == this.course_search) || (course.c_name == this.course_search));
    }
  }

  getAllCourses(){
    this.allcourses = ALLCOURSES;
  }

  ngOnInit() {
    this.defaultPBClass = 'progress-bar progress-bar-striped active';
    this.getCourses();
    this.getUser();
    this.getQuests();
  }

}
