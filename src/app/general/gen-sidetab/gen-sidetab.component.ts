//Core Imports
import {
  Component,
  OnInit,
  Input,
  HostListener
} from '@angular/core';

import {
  NgModel
} from '@angular/forms';

import {
  Router
} from '@angular/router';

//Application Imports
import {
  CommentPost,
  Course,
  Quest,
  Section,
  User
} from 'shared/models';

import {
  CommentPostService,
  PageService,
  QuestService,
  SectionService,
  UserService
} from 'shared/services';

@Component({
  selector: 'gen-sidetab',
  templateUrl: './gen-sidetab.component.html',
  styleUrls: ['./gen-sidetab.component.css']
})
export class GenSidetabComponent implements OnInit {
  @Input('isProfile') isProfile: boolean = false;

  //current user
  user: User;
  image: string;

  //for pages other than profile page  
  quests: Quest[] = []; //user's quests
  //for progress bar; 
  defaultPBClass: string = 'progress-bar progress-bar-striped active';
  progressBarClass: string[];
  questTimePercentage: string[];
  questTimeDisplay: string[];

  //for profile page only
  isEditing: boolean = false;
  sections: Section[] = [];
  courses: Course[] = [];

  isShowMenuButton: boolean = false;

  windowWidth: number = window.innerWidth;
  
  //if screen size changes it'll update
  @HostListener('window:resize', ['$event'])
  resize(event) {
      this.checkSize();
  }

  checkSize() {
      this.windowWidth = window.innerWidth;
      if(this.windowWidth <= 600){
        this.isShowMenuButton = true;
      } else {
        this.isShowMenuButton = false;
      }
  }


  constructor(
    private commentPostService: CommentPostService,
    private pageService: PageService,
    private questService: QuestService,
    private sectionService: SectionService,
    private userService: UserService,
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.image = "/assets/images/not-found.jpg"
    this.defaultPBClass = 'progress-bar progress-bar-striped active';
    this.getUser();
    this.isEditing = false;
    this.checkSize();
    this.pageService.isProfile.subscribe(isProfile => {
      this.isProfile = isProfile;
    });
  }

  /**
   * Obtains information of the current user
   * @description Obtains current user's information as well as knowing what information to display
   * in the sidetab; personal information are displayed on general-profile page while 
   * section quests are for other pages except general-profile page
   */
  getUser(): void {
    this.userService.getUser("5a37f4500d1126321c11e5e7")
      .subscribe(user => {
        console.log(user);
        this.user = user;

        let image: string = this.user.user_photo? this.user.user_photo: "avatar.jpg";
        this.image = "/assets/images/" + image;

        if (this.isProfile) {
          this.getUserSections(this.user.user_id);
        } else {
          this.getQuests(this.user.user_id);
        }
      });
  }

  /**
   * Get the array of sections where the user is a student
   * @description Gets the user's array of sections and the course where it belongs and 
   * stores it in the 'sections' and 'courses' array respectively; 
   * used when the user is in the general-profile page
   * @param user_id id of the user whose array of sections are to be retrieved
   * 
   */
  getUserSections(user_id: string) {
    console.log(user_id);
    this.sectionService.getUserSections(user_id).subscribe(sections => {
      this.sections = sections;
      console.log(sections);
      this.courses = [];
      this.sections.forEach((section, index) => {
        this.sectionService.getCourseById(section.course_id).subscribe(course => {
          this.courses[index] = course;
          console.log(this.courses);
        })
      });
    });
  }

  /**
   * Obtains quests participated by the user
   * @description Obtains quests of the current user and stores it to 'courses' variable;
   * used when user is navigating on pages other than the general-profile page
   * 
   * @param user_id the id of the user that asks for the list of quests
   */
  getQuests(user_id): void {
    this.questService.getUserSectionQuests(user_id)
      .subscribe(quests => {
        this.quests = quests;
        this.timeDisplays();
      });
  }

  /**
   * Edits the user's information
   * @description Edits the user's information; changes isEditing variable which changes the
   * features of the input fields
   */
  editUserInformation() {
    this.isEditing = !this.isEditing;
  }

  /*Below are the helper functions for this component */

  /**
   * Navigates to the specific section's page
   * @param section_id id of the section where the user must be redirected to
   */
  openSectionPage(section_id: string) {
    //AHJ: must navigate to the specific section's home page yet it is still not available
    console.warn(section_id);
    this.router.navigate(['/specific-news', section_id]);
  }

  /**
   * Returns the difference in minutes of two dates
   * @param date1 the date of the further date
   * @param date2 the date of the earlier date
   * 
   * @returns the difference (in minutes) of the two dates
   */
  timeDiff(date1: Date, date2: Date): number {
    date1 = new Date(date1);
    date2 = new Date(date2);

    let time1 = date1.getTime();
    let time2 = date2.getTime();
    let diffInMs: number = time1 - time2;

    return diffInMs;
  }

  /**
   * Changes the time displays in the progress bar and sets the width of the progress bar
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
        string = this.getTimeLabel(totalMinRem, hourRem);
        if (totalMinRem <= 0) {
          timePerc = 100;
        }

        this.questTimeDisplay[i] = string;
        this.questTimePercentage[i] = timePerc.toString() + '%';
      }
    }, 1000);
  }

  /**
   * Returns the appropriate progress bar label
   * @description Returns the appropriate progress bar label based on either the total minutes 
   * remaining or the hours remaining
   * @param totalMinRem the total minutes remaining for the quest
   * @param hourRem the hours remaining for the quest
   * 
   * @returns string label for the progress bar
   */
  getTimeLabel(totalMinRem: number, hourRem: number): string{
    let string = "";
    if (totalMinRem <= 0) {
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
    return string;
  }

  /**
   * @summary changes the color of the progress bar by changing its class
   * 
   * @param hourRem hours remaining for quest of index i
   * @param i index of the quest to be checked
   */
  toggleClass(hourRem, i) {
    //AHJ: not working; fix this later
    this.progressBarClass = [];
    if (hourRem <= 24) {
      this.progressBarClass[i] = 'progress-bar-danger';
    } else {
      this.progressBarClass[i] = 'progress-bar-success';
    }
  }
}
