import {
  Component,
  OnInit
} from '@angular/core';

import {
  UserService
} from '../user.service';

import {
  User,
  TOTXP,
  MAXXP
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
  grades: number[];


  // lineChart
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13', 'Week 14', 'Week 15', 'Week 16'];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:100}}]
    }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  getGrades(): void {
    this.grades = TOTXP? TOTXP: [];
    let dataGrade: number[] = [];
    let max: number = MAXXP? MAXXP: 10;
    for(let i=0; i<this.grades.length; i++){
      let perc: number = this.grades[i]/MAXXP*100; 
      dataGrade.push(Math.round((perc + 0.00001) * 100) / 100);
    }
    let dataLine: any = {
      data: dataGrade,
      label: 'CMSC 128'
    };
    this.lineChartData.push(dataLine);
    console.log(this.lineChartData);
  }









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
    this.getGrades();
  }


}
