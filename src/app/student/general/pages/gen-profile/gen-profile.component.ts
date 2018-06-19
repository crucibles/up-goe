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
    Quest,
    User,
    Badge,
    Section,
    Experience
} from 'shared/models';

import {
    BadgeService,
    ExperienceService,
    QuestService,
    PageService,
    SectionService,
    UserService
} from 'shared/services';
import Chart = require('chart.js');

/* AHJ: Remove once the services are implemented properly */

const SECTIONS: any[] = [
    {
        course_name: "CMSC 128",
        section_name: "A",
        week_total_exp: [10, 20, 30, 35],
        max_exp: 200
    }
    // },
    // {
    //     course_name: "CMSC 128",
    //     section_name: "B",
    //     week_total_exp: [120, 40, 80, 321, 700],
    //     max_exp: 1200
    // },
    // {
    //     course_name: "CMSC 141",
    //     section_name: "J",
    //     week_total_exp: [10, 30, 70, 300, 500],
    //     max_exp: 1000
    // },
];

//TOTXP - total accumulative weekly experience points of current student
const TOTXP: number[] = [1000, 2123, 3439, 4655, 6053, 6104];

//MAXXP - the max experience points to obtain a 1.0 grade
const MAXXP: number = 10000;

@Component({
    selector: 'app-gen-profile',
    templateUrl: './gen-profile.component.html',
    styleUrls: ['./gen-profile.component.css']
})

export class GenProfileComponent implements OnInit {
    chart: Chart;
    //basic info
    user: User;
    courseSections: any[] = [];

    badges: Badge[];
    // lineChart
    lineChartColors: Array<any>;
    lineChartData: Array<any> = [];
    lineChartLabels: Array<any> = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13', 'Week 14', 'Week 15', 'Week 16'];
    lineChartOptions: any = {
        responsive: true,
        scales: {
            yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: 100 } }]
        }
    };

    /**
     * @constructor
     * 
     * @param pageService: used to identify that the profile page is currently navigated on 
     * @param userService used to obtains data needed for user
     */
    constructor(
        private badgeService: BadgeService,
        private experienceService: ExperienceService,
        private questService: QuestService,
        private pageService: PageService,
        private sectionService: SectionService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.pageService.isProfilePage(true);
        this.getUser();
        this.userService.updateUserConditions(this.userService.getCurrentUser().getUserId()).subscribe((x) => {

            this.userService.getUser(this.userService.getCurrentUser().getUserId())
                .subscribe((user) => {
                    this.userService.setCurrentUser(user);
                    this.courseSections = this.sectionService.getCurrentUserSections();
                    this.setPerformanceGraphData();
                });

            this.badgeService.checkIfWillEarnABadge().subscribe((badge) => {
                this.badgeService.getCurrentStudentSystemBadges().subscribe((x) => {
                    let y = [];
                    y.push(x);
                    console.warn(y);
                    let bs = y.map(z => {
                        return z.map((a) => {
                            return new Badge(a);
                        });
                    });
                    this.badges = bs[0];

                    console.warn(bs);
                });
            });


        });

    }

    /**
     * Stores the current user
     * @description Stores the current user to the 'user' variable from the user.service function
     */
    getUser(): void {
        //ced make curUser in userService or use localStorage
        this.user = this.userService.getCurrentUser();
    }

    /* Below are the helper functions */

    /**
    * Sets the performance graph's design in the profile page
    */
    setPerformanceGraph() {
        this.lineChartLabels = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13', 'Week 14', 'Week 15', 'Week 16'];
        this.lineChartOptions = {
            legend: {
                display: true
            },
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

        var data = {
            labels: this.lineChartLabels,
            datasets: this.lineChartData
        }

        var HTMLchart = document.getElementById("performance-graph");
        var ctx = (<HTMLCanvasElement>HTMLchart).getContext("2d");

        this.chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: this.lineChartOptions
        });
    }

    /**
    * Sets the performance graph's displayed data in the profile page
    */
    setPerformanceGraphData() {
        let max: number = MAXXP ? MAXXP : 10;
        this.courseSections.forEach(courseSection => {
            this.experienceService.getSectionGrades(new Section(courseSection.section).getSectionId(), this.user.getUserId())
            .subscribe(sectionSubmissions => {
                let courseSec = courseSection;
                if (sectionSubmissions.length > 0) {
                    let submissions = sectionSubmissions.map(submission => new Experience(submission))[0];
                    let section = new Section(courseSec.section);
                    let dataGrade: number[] = [];
                    
                        let grades = submissions.getWeeklyAccumulativeGrades();
                        grades.forEach(grade => {
                            // get the decimal percentage
                            let percentage: number = (grade / MAXXP) * 100;
                            
                            // round the decimal up to two decimal points
                            dataGrade.push(Math.round((percentage + 0.00001) * 100) / 100);
                        });
                        
                        this.lineChartColors = this.pageService.lineChartColors;
                        let rand: number = this.lineChartData && this.lineChartData.length? this.lineChartData.length % this.lineChartColors.length: 0;
                        let color = this.lineChartColors[rand];
                        let dataLine: any = {
                            data: dataGrade,
                            label: courseSec.course_name + " - " + section.getSectionName(),
                            backgroundColor: color.backgroundColor,
                            borderColor: color.borderColor,
                            pointBackgroundColor: color.pointBackgroundColor,
                            pointBorderColor: color.pointBorderColor,
                            pointHoverBackgroundColor: color.pointHoverBackgroundColor,
                            pointHoverBorderColor: color.pointHoverBorderColor
                        };


                        if (!this.chart || this.lineChartData.length == 0) {
                            this.lineChartData.push(dataLine);
                            this.setPerformanceGraph();
                        } else {
                            this.lineChartData.push(dataLine);
                            this.chart.config.data.datasets = this.lineChartData;
                            this.chart.update();
                        }
                    }
                });
        });
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
