//Core Imports
import {
    Component,
    OnInit
} from '@angular/core';

//Application Imports
import {
    User
} from 'shared/models';

import {
    PageService,
    UserService
} from 'shared/services';
import { ActivatedRoute } from '@angular/router';

const TOTXP: number[] = [10, 20, 30, 40, 100];
const MAXXP: number = 200;

@Component({
    selector: 'app-specific-profile',
    templateUrl: './specific-profile.component.html',
    styleUrls: ['./specific-profile.component.css']
})
export class SpecificProfileComponent implements OnInit {
    user: User;
    grades: number[];

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
     * @param userService uses the UserService to obtains data needed for user
     */
    constructor(
        private pageService: PageService,
        private route: ActivatedRoute,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.getUser();
        this.getCurrentSection();
        this.getGrades();
        this.setDefault();
    }


    getCurrentSection(){
        this.route.paramMap.subscribe(params => {
			let sectionId = params.get('sectionId');
		});
    }

    setDefault() {
        this.pageService.isProfilePage(true);
        this.setPerformanceGraph();
    }

    /**
     * Stores the current user
     * @description Stores the current user to the 'user' variable from the user.service function
     */
    getUser(): void {
        this.user = this.userService.getCurrentUser();
    }

    /**
     * Stores the user's grades
     */
    getGrades(): void {
        this.grades = TOTXP ? TOTXP : [];
        let dataGrade: number[] = [];
        let max: number = MAXXP ? MAXXP : 10;

        this.grades.forEach(grade => {
            // get the decimal percentage
            let percentage: number = (grade / MAXXP) * 100;

            // round the decimal up to two decimal points
            dataGrade.push(Math.round((percentage + 0.00001) * 100) / 100);
        })

        let dataLine: any = {
            data: dataGrade,
            label: 'CMSC 128'
        };
        this.lineChartData.push(dataLine);
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
