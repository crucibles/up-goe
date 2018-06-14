//Core Imports
import {
	Injectable,
	Output,
	EventEmitter
} from '@angular/core';

import {
	Router
} from '@angular/router';

//Third-Party Imports
import {
	Observable
} from 'rxjs/Observable';

//Application Imports 
import {
	SectionService
} from './section.service';

import {
	Section, Course
} from 'shared/models';

@Injectable()
export class PageService {

	@Output() isProfile: EventEmitter<boolean> = new EventEmitter();
	@Output() isCourseCreate: EventEmitter<boolean> = new EventEmitter();

	public lineChartColors: Array<any> = [
		{ // light grey
			backgroundColor: "rgba(255, 99, 132, 0.2)",
			borderColor: "rgba(255,99,132,1)",
			pointBackgroundColor: "rgba(255,99,132,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(255,99,132,0.8)"
		},
		{ // grey
			backgroundColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: 'rgba(54, 162, 235, 1)',
			pointBackgroundColor: 'rgba(54, 162, 235,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(54, 162, 235,0.8)'
		},
		{ // dark grey
			backgroundColor: 'rgba(255, 206, 86, 0.2)',
			borderColor: 'rgba(255, 206, 86, 0.2)',
			pointBackgroundColor: 'rgba(255, 206, 86,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(255, 206, 86,1)'
		},
		{ // blue
			backgroundColor: "rgba(151,187,205,0.2)",
			borderColor: "rgba(151,187,205,1)",
			pointBackgroundColor: "rgba(151,187,205,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(151,187,205,0.8)"
		},
		{ // red
			backgroundColor: "rgba(247,70,74,0.2)",
			borderColor: "rgba(247,70,74,1)",
			pointBackgroundColor: "rgba(247,70,74,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(247,70,74,0.8)"
		},
		{ // green
			backgroundColor: "rgba(70,191,189,0.2)",
			borderColor: "rgba(70,191,189,1)",
			pointBackgroundColor: "rgba(70,191,189,1)",
			pointborderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(70,191,189,0.8)"
		},
		{ // yellow
			backgroundColor: "rgba(253,180,92,0.2)",
			borderColor: "rgba(253,180,92,1)",
			pointBackgroundColor: "rgba(253,180,92,1)",
			pointborderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(253,180,92,0.8)"
		},
		{ // light red
			backgroundColor: "rgba(75, 192, 192, 0.2)",
			borderColor: "rgba(75, 192, 192,1)",
			pointBackgroundColor: "rgba(75, 192, 192,1)",
			pointborderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(75, 192, 192,0.8)"
		},
		{ // yellow
			backgroundColor: "rgba(153, 102, 255, 0.2)",
			borderColor: "rgba(153, 102, 255,1)",
			pointBackgroundColor: "rgba(153, 102, 255,1)",
			pointborderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(153, 102, 255,0.8)"
		},
		{ // yellow
			backgroundColor: "rgba(255, 159, 64, 0.2)",
			borderColor: "rgba(255, 159, 64,1)",
			pointBackgroundColor: "rgba(255, 159, 64,1)",
			pointborderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(255, 159, 64,0.8)"
		}
	];

	constructor(
		private router: Router,
		private sectionService: SectionService
	) { }

	/**
	   * Returns the appropriate datetimestring given a date
	   * @param date date to be formatted
	   * 
	   * @returns dateTime string of the formatted date
	   * 
	   * @see formatDate()
	   * @see formatTime()
	   */
	public formatDateTime(date: Date): string {
		date = new Date(date);
		let displayDateTime: string = date ?
			this.formatDate(date) + " "
			+ this.formatTime(date)
			: "";
		return displayDateTime;
	}

	/**
	 * Used to inform subscribers that the page is either in profile page or not
	 * @param isProfile identifies if page is profile page or not
	 * 
	 * @returns {boolean} returns true if user is navigating on profile page; false if otherwise
	 */
	public isProfilePage(isProfile: boolean): boolean {
		this.isProfile.emit(isProfile);
		return isProfile;
	}

	/**
	 * Used to inform subscribers that the page is either in profile page or not
	 * @param isProfile identifies if page is profile page or not
	 * 
	 * @returns {boolean} returns true if user is navigating on profile page; false if otherwise
	 */
	public isCourseCreated(isCourseCreated: boolean): boolean {
		this.isCourseCreate.emit(isCourseCreated);
		return isCourseCreated;
	}

	public openSectionPage(sectionId: string) {
		this.router.navigate(['/student/specific/specific-news', sectionId]);
	}

	public openTeacherSectionPage(sectionId: string) {
		this.sectionService.searchSection(sectionId).subscribe(res => {
			this.sectionService.setCurrentSection(new Section(res));
		});
		this.router.navigate(['/teacher/specific/specific-news', sectionId]);
	}

	/**
	* Returns the appropriate datestring given a date object
	* @param date_obj date to be formatted
	* 
	* @returns string of the formatted date
	*/
	public formatDate(date_obj) {
		let months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
		let month = months[date_obj.getMonth()];
		let day = date_obj.getDate();
		let year = date_obj.getFullYear();
		let datestring: string = month + " " + day + ", " + year;
		return datestring;
	}

	/**
	* Returns the appropriate timestring given a date object
	* @param date_obj date to be formatted
	* 
	* @returns formatted time string
	*/
	public formatTime(date_obj) {
		// formats a javascript Date object into a 12h AM/PM time string
		var hour = date_obj.getHours();
		var minute = date_obj.getMinutes();
		var amPM = (hour > 11) ? "pm" : "am";
		if (hour > 12) {
			hour -= 12;
		} else if (hour == 0) {
			hour = "12";
		}
		if (minute < 10) {
			minute = "0" + minute;
		}
		return hour + ":" + minute + amPM;
	}

	public getCurrentDate(){
		return new Date();
	}
}
