//Core Imports
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

//Application Imports
import { CommentPost } from '../comment-post'
import { CommentPostService } from '../comment-post.service'
import { Course, courses } from '../course';
import { Quest, quests } from '../quest'
import { User } from '../user';
import { UserService } from '../user.service';
import { QuestService } from '../quest.service'

@Component({
  selector: 'gen-sidetab',
  templateUrl: './gen-sidetab.component.html',
  styleUrls: ['./gen-sidetab.component.css']
})
export class GenSidetabComponent implements OnInit {
  quests: Quest[] = [];
  user: User;

  //for progress bar
  defaultPBClass: string = 'progress-bar progress-bar-striped active';
  progressBarClass: string[];
  questTimePercentage: string[];
  questTimeDisplay: string[];

  constructor(
    private userService: UserService,
    private commentPostService: CommentPostService,
    private questService: QuestService
  ) { }

  ngOnInit() {
    this.defaultPBClass = 'progress-bar progress-bar-striped active';
    this.getUser();
  }

  /**
   * @summary Obtains information of the current user
   */
  getUser(): void {
    this.userService.getUserById("1")
      .subscribe(user => {
        this.user = user;
        this.getQuests(this.user.user_id);
      });
  }

  getNumOfPost() {
    /*this.commentPostService.getSectionPosts()
      .subscribe(post => {
        let postdummy: CommentPost
      });*/
  }

  /**
   * @summary: Obtains quests of the current user and stores it to 'courses' variable
   * 
   * @param user_id the id of the user that asks for the list of quests
   */
  getQuests(user_id): void {
    this.questService.getQuestById(user_id)
      .subscribe(quest => {
        this.quests.push(quest);
        this.quests = quests;
        this.timeDisplays();
      });
  }

  /**
   * @summary Returns the difference in minutes of two dates
   * 
   * @param date1 the date of the further date
   * @param date2 the date of the earlier date
   * 
   * @returns the difference (in minutes) of the two dates
   */
  timeDiff(date1: Date, date2: Date): number {
    let time1 = date1.getTime();
    let time2 = date2.getTime();
    let diffInMs: number = time1 - time2;
    return diffInMs;
  }

  /**
   * @summary changes the time displays in the progress bar and sets the width of the progress bar
   */
  timeDisplays() {
    let string: string = "";

    this.questTimeDisplay = [];
    this.questTimePercentage = [];
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


  /**
   * @summary changes the color of the progress bar by changing its class
   * 
   * @param hourRem hours remaining for quest of index i
   * @param i index of the quest to be checked
   */
  toggleClass(hourRem, i) {
    this.progressBarClass = [];
    if (hourRem <= 24) {
      this.progressBarClass[i] = 'progress-bar-danger';
    } else {
      this.progressBarClass[i] = 'progress-bar-success';
    }
  }
}
