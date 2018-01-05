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
  TOTXP,
  MAXXP
} from 'shared/models';

import {
  PageService,
  UserService
} from 'shared/services';    

@Component({
  selector: 'app-gen-profile',
  templateUrl: './gen-profile.component.html',
  styleUrls: ['./gen-profile.component.css']
})
export class GenProfileComponent implements OnInit {
  user: User;
  grades: number[];
  
  // lineChart
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13', 'Week 14', 'Week 15', 'Week 16'];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: 100 } }]
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

  /**
   * @constructor
   * 
   * @param userService uses the UserService to obtains data needed for user
   */
  constructor(
    private pageService: PageService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.getUser();
    this.getGrades();
    this.pageService.isProfilePage(true);
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

  /**
   * @summary Stores the user's grades
   */
  getGrades(): void {
    this.grades = TOTXP ? TOTXP : [];
    let dataGrade: number[] = [];
    let max: number = MAXXP ? MAXXP : 10;
    for (let i = 0; i < this.grades.length; i++) {
      let perc: number = this.grades[i] / MAXXP * 100;
      dataGrade.push(Math.round((perc + 0.00001) * 100) / 100);
    }
    let dataLine: any = {
      data: dataGrade,
      label: 'CMSC 128'
    };
    this.lineChartData.push(dataLine);
  }

  getUser(): void {
    this.userService.getUser("1")
      .subscribe(user => this.user = user);
  }

}
