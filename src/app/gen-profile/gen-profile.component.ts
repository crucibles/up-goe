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
  Course
} from '../course';

import {
  Quest,
  QUESTS
} from '../quest'

import {
  NgModel
} from '@angular/forms';


import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-gen-profile',
  templateUrl: './gen-profile.component.html',
  styleUrls: ['./gen-profile.component.css']
})
export class GenProfileComponent implements OnInit {
  courses: Course[];
  quests: Quest[];
  user: User;
  course_search: string;
  timePerc: number[];
  pb_width: string = '50%'; //width of the progress bar
  timeObservable: Observable<any>;
  timeObserver: Observer<any>;
  questTimePercentage: string[];
  questTimeDisplay: string[];
  progressBarClass: string[];
  defaultPBClass: string = 'progress-bar progress-bar-striped active';


  constructor(private userService: UserService) {
  }

  getCourses(): void {
    this.courses = [];
    console.log(this.courses.length);
    //this.userService.getCourses()
    //  .subscribe(courses => this.courses = courses);
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  getQuests(): void {
    this.quests = QUESTS;
    this.timeDisplays();
  }

  timeQuest() {
    //console.log(this.trials[4]);
    setInterval(() => {
      //  this.trials[0]++;
      //  console.log(this.trials[0]);
    }, 1000);
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

        if (hourRem >= 168) {
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
  }

  ngOnInit() {
    this.defaultPBClass = 'progress-bar progress-bar-striped active';
    this.timeObservable = new Observable(observer => {
      this.timeObserver = observer;
    });
    this.getCourses();
    this.getUser();
    this.getQuests();
    this.timeQuest();
  }

}
