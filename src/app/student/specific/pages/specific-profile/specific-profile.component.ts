//Core Imports
import {
    Component,
    OnInit
} from '@angular/core';

//Application Imports
import {
    Section,
    User,
    Experience,
    Badge
} from 'shared/models';

import {
    ExperienceService,
    PageService,
    SectionService,
    UserService,
    BadgeService
} from 'shared/services';

const MAXXP: number = 5000;

@Component({
    selector: 'app-specific-profile',
    templateUrl: './specific-profile.component.html',
    styleUrls: ['./specific-profile.component.css']
})
export class SpecificProfileComponent implements OnInit {
    //basic info
    currentSection: Section;
    currentUser: User;

    //performance graph data
    userSubmission: Experience;

    badges: Badge[];


    // lineChart
    isChartReady: boolean = false;
    lineChartColors: Array<any>;
    lineChartData: Array<any> = [];
    lineChartLabels: Array<any> = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13', 'Week 14', 'Week 15', 'Week 16'];
    lineChartOptions: any = {
        plugins: {
            datalabels: {
                display: false,
            }
        },
        responsive: true,
        scales: {
            yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: 100 } }]
        }
    };

    /**
     * @constructor
     * 
     * @param userService uses the UserService to obtains data needed for user
     */
    constructor(
        private experienceService: ExperienceService,
        private pageService: PageService,
        private sectionService: SectionService,
        private userService: UserService,
        private badgeService: BadgeService
    ) {
    }

    ngOnInit() {
        this.setDefault();
        this.getGrades();
        this.setPerformanceGraph();
        this.initBadges();
    }

    initBadges() {
        this.badges = [];
        this.badgeService.getSectionBadges(this.sectionService.getCurrentSection().getSectionId()).subscribe(bs => {
            bs.map(badge => {
                let x = new Badge(badge);
                x.getBadgeAttainers().filter(user => {
                    if (this.currentUser.getUserId() == user) {
                        this.badges.push(x);
                    }
                });
            });
        });
    }

    getCurrentSection() {
        this.currentSection = this.sectionService.getCurrentSection();
    }

    setDefault() {
        this.pageService.isProfilePage(true);
        this.lineChartData = [];
        this.isChartReady = false;
        this.getUser();
        this.getCurrentSection();
    }

    /**
     * Stores the current user
     * @description Stores the current user to the 'user' variable from the user.service function
     */
    getUser(): void {
        this.currentUser = this.userService.getCurrentUser();
    }

    /**
     * Stores the user's grades
     */
    getGrades(): void {
        let dataGrade: number[] = [];
        let max: number = MAXXP ? MAXXP : 10;

        this.experienceService.getSectionGrades(this.currentSection.getSectionId(), this.currentUser.getUserId())
            .subscribe(submissions => {
                if (submissions.length > 0) {
                    this.userSubmission = submissions.map(submission => new Experience(submission))[0];

                    let grades = this.userSubmission.getWeeklyAccumulativeGrades();
                    grades.forEach(grade => {
                        // get the decimal percentage
                        let percentage: number = (grade / MAXXP) * 100;

                        // round the decimal up to two decimal points
                        dataGrade.push(Math.round((percentage + 0.00001) * 100) / 100);
                    });

                    let dataLine: any = {
                        data: dataGrade,
                        label: this.sectionService.getCurrentCourse().getCourseName() + " - " + this.currentSection.getSectionName()
                    };

                    this.lineChartData.push(dataLine);
                    this.isChartReady = true;
                }
            });
    }

    /* Below are the helper functions */

    /**
    * Sets the performance graph's display and design in the profile page
    */
    setPerformanceGraph() {
        this.lineChartColors = this.pageService.lineChartColors;
        this.lineChartLabels = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13', 'Week 14', 'Week 15', 'Week 16'];
        this.lineChartOptions = {
            responsive: true,
            scales: {
                yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: 100 } }]
            }
        };
    }

    /**
     * @public
     * 
     * @summary Triggers when chart is clicked
     * @param e 
     */
    public chartClicked(e: any): void {
    }

    /**
     * @public
     * 
     * @summary Triggers when chart is hovered
     * @param e 
     */
    public chartHovered(e: any): void {
    }
}
