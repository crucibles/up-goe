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
    PageService,
    UserService,
    BadgeService,
    SectionService,
    ExperienceService
} from 'shared/services';

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
    //basic info
    user: User;
    courseSections: any[] = [];

    badges: Badge[];
    // lineChart
    isChartReady: boolean = false;
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
        private pageService: PageService,
        private sectionService: SectionService,
        private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.pageService.isProfilePage(true);
        this.isChartReady = false;
        this.getUser();
        //this.getGrades();
        this.setPerformanceGraph();
        this.userService.updateUserConditions(this.userService.getCurrentUser().getUserId()).subscribe((x) => {
            console.log("done updating");
            console.log("result" + x);

            this.userService.getUser(this.userService.getCurrentUser().getUserId())
                .subscribe((user) => {
                    this.userService.setCurrentUser(user);
                    console.log("CHECK IF WITH COURSE");
                    console.log( this.sectionService.getCurrentUserSections());
                    this.courseSections = this.sectionService.getCurrentUserSections();
                    this.setPerformanceGraphData();
                });

            this.badgeService.checkIfWillEarnABadge().subscribe((badge) => {
                console.log(badge);
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
        this.user = this.userService.getCurrentUser()
    }

    /**
     * Display the user's grades in the performance graph
     * @description Obtains the current user's array of weekly grades (or experience points) in an accumulative manner (e.g [1, 20, 200...]),
     * computes its relative percentage based on the section's max experience points and sets the performance graph's value with this 
     * computed array of percentage.
     */
    getGrades(): void {
        let grades = TOTXP ? TOTXP : [];
        let max: number = MAXXP ? MAXXP : 10;

        //AHJ: unimplemented
        //replace SECTIONS with this.getUserSectionExp(user_id) [section.service] function if the function is working
        SECTIONS.forEach(section => {
            let dataGrade: number[] = [];

            //convert the user's section weekly accumulative exp into dataset readable by performance graph
            section.week_total_exp.forEach(grade => {
                // get the decimal percentage
                let percentage: number = (grade / section.max_exp) * 100;

                // round the decimal up to two decimal points
                dataGrade.push(Math.round((percentage + 0.00001) * 100) / 100);
            });

            let className = section.course_name + " - " + section.section_name;
            let dataLine: any = {
                data: dataGrade,
                label: className
            };

            this.lineChartData.push(dataLine);
            console.log(this.lineChartData);
        })
    }

    /* Below are the helper functions */

    /**
    * Sets the performance graph's design in the profile page
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
    * Sets the performance graph's displayed data in the profile page
    */
    setPerformanceGraphData() {
        let dataGrade: number[] = [];
        let max: number = MAXXP ? MAXXP : 10;
        console.log("this.currentSections");
        console.log(this.courseSections);
        this.courseSections.forEach(courseSection => {
            let section = new Section(courseSection.section);
            this.experienceService.getSectionGrades(section.getSectionId(), this.user.getUserId())
            .subscribe(sectionSubmissions => {
                if(sectionSubmissions.length > 0){
                    let submissions = sectionSubmissions.map(submission => new Experience(submission))[0];
    
                    let grades = submissions.getWeeklyAccumulativeGrades();
                    console.log(grades);
                    grades.forEach(grade => {
                        // get the decimal percentage
                        let percentage: number = (grade / MAXXP) * 100;
            
                        // round the decimal up to two decimal points
                        dataGrade.push(Math.round((percentage + 0.00001) * 100) / 100);
                    });
            
                    let dataLine: any = {
                        data: dataGrade,
                        label: courseSection.course_name + " - " +  section.getSectionId()
                    };
                    
                    if(this.lineChartData.length == 0){
                        this.lineChartData.push(dataLine);
                    } else {
                        let chartData = this.lineChartData;
                        chartData.push(dataLine);
                        this.lineChartData = chartData;
                    }
                    this.isChartReady = true;
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
        console.log(e);
    }

    /**
     * @public
     * 
     * @summary Triggers when chart is hovered
     * @param e 
     */
    public chartHovered(e: any): void {
        console.log(e);
    }
}
