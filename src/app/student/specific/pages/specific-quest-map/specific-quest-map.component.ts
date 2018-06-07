//Core Imports
import {
	Component,
	OnInit,
	ViewChild,
	TemplateRef,
	Input,
	ElementRef
} from '@angular/core';

import {
	ActivatedRoute
} from '@angular/router';

//Third-Party Imports
import {
	BsModalRef,
	BsModalService,
	ModalDirective
} from 'ngx-bootstrap';

//Application Imports
import {
	Quest,
	Section,
	SectionQuest,
	User,
	QuestMap
} from 'shared/models';

import {
	PageService,
	SectionService,
	UserService,
	QuestService,
	LeaderboardService,
    ExperienceService
} from 'shared/services';

import {
	AlertService
} from 'shared/services/alert.service';

import Chart = require('chart.js');

import { 
	ToastsManager 
} from 'ng2-toastr';

@Component({
	selector: 'app-specific-quest-map',
	templateUrl: './specific-quest-map.component.html',
	styleUrls: ['./specific-quest-map.component.css']
})
export class SpecificQuestMapComponent implements OnInit {
	@ViewChild('questTemplate') questTemplate: TemplateRef<any>;
	@ViewChild('leaderboardTemplate') leaderboardTemplate: TemplateRef<any>;

	options: any = {};
	chartData: Array<any> = [];
	// Stored here is the security questions in the sign up form.
	private quests: Quest[] = new Array();

	// quest map chart
	xTick: number;
	yTick: number;
	chart: Chart;
	chartColors: Array<any>;
	chartLabels: Array<any> = [];
	chartWidth: number;
	chartHeight: number;

	// quest map details
	questMap: QuestMap;

	// quest; deletable
	isQuestTakn: boolean = false;
	pending: boolean = true;

	currentUser: User;

	
    commentBox: any = "";
	private questModalRef: BsModalRef;
	private lbModalRef: BsModalRef;
	private currentSection: Section;
	private questClicked: Quest;
	private leaderboardRecords;
	private questTitle;

	constructor(
		private modalService: BsModalService,
		private pageService: PageService,
		private route: ActivatedRoute,
		private sectionService: SectionService,
		private userService: UserService,
		private alertService: AlertService,
		private questService: QuestService,
		private leaderboardService: LeaderboardService,
		private experienceService: ExperienceService,
		private toaster: ToastsManager
	) {
		this.currentUser = this.userService.getCurrentUser();
		this.currentSection = new Section(this.sectionService.getCurrentSection());
	}

	ngOnInit() {
		this.setDefault();
		this.getCurrentUser();
		this.getCurrentSection();
		this.loadQuestMap();
	}

	isPending() {
		return this.pending;
	}

	getQuestScores() {
		var currentSection = this.currentSection.getSectionId();
		var currentQuest = this.questClicked.getQuestId();
		this.leaderboardService.getQuestScores(currentSection, currentQuest)
			.subscribe((user) => {
				if (user) {
					console.log(user);
					this.leaderboardRecords = user;
				} else {
					console.log('Failed to acquire quest scores.');
				}
			}, error => {
				this.alertService.error(error);
			});
	}

	loadQuestMap() {
		// this.questService.getUserJoinedQuests(this.currentUser.getUserId())
		// 	.subscribe(quests => {
		// 		console.log(quests);
		// 		this.quests = quests.map(quest => new Quest(quest));
		// 		//AHJ: unimplemented; getter for quest map data (remove comment marker belowif available)
		// 		//this.questService.getQuestMap(this.currentSection.getCourseId()).subscribe(data => {
		// 		this.questMap = new QuestMap(MOCKQUESTMAP, this.quests);
		// 		this.setQuestMap();
		// 		//});
		// 	});
		this.questService.getSectionQuests(this.currentSection.getSectionId()).subscribe(quests => {
			console.log("QUEST LOADED");
			console.log(quests);
			this.quests = quests.map(quest => new Quest(quest));
			this.questService.getSectionQuestMap(this.currentSection.getSectionId()).subscribe(questmap => {
				console.log("QUESTMAP LOADEd");
				console.log(questmap);
				this.questMap = new QuestMap(questmap, this.quests);
				this.setQuestMap();
			});
		});
	}

	openQuest(quest: any) { //'quest: any' in here means the quest has not been converted to Quest type
		//AHJ: Unimplemented
		//WARNING!! Remove QUESTS in specific-qm.html when this is implemented
		console.log(quest);
		this.questClicked = new Quest(quest);
		console.log(this.questClicked);
		if (this.questClicked) {
			this.questModalRef = this.modalService.show(this.questTemplate);
			this.getQuestScores();

			this.experienceService.getCurrentExperience(
				this.questClicked.getQuestId(),
				this.currentUser.getUserId(),
				this.currentSection.getSectionId()
			).subscribe(res => {
				if(res == "true") {
					this.pending = false;
				} else if (res == "false") {
					this.pending = true;
				}
			});
		}
	}

	openLeaderBoardModal() {
		console.log("opened");
		this.lbModalRef = this.modalService.show(this.leaderboardTemplate);
	}

	/**
    * Sets the quest map based on the data received.
	* @param data string where the quests and its respective coordinates will be located
    */
	setQuestMap() {
		this.chartColors = this.pageService.lineChartColors;
		this.chartWidth = 650;
		this.chartHeight = 300;

		var QM = {
			datasets: this.questMap.getQuestMapDataSet()
		}

		this.xTick = 50;
		this.yTick = 50;

		let options = {
			onClick: this.chartClicked.bind(this),
			legend: { display: false },
			scales: {
				xAxes: [{
					display: false,
					type: 'linear',
					ticks: {
						max: this.xTick,
						min: 0
					}
				}],
				yAxes: [{
					display: false,
					ticks: {
						max: this.yTick,
						min: 0
					}
				}],
			},
			tooltips: {
				enabled: true,
				mode: 'single',
				callbacks: {
					title: function (tooltipItems, data) {
						var tooltipItem = tooltipItems[0];
						return data.datasets[tooltipItem.datasetIndex].label;
					},
					label: function (tooltipItem, data) {
						return "";
					}
				}
			}
		}

		var HTMLchart = document.getElementById("quest-map");
		var ctx = (<HTMLCanvasElement>HTMLchart).getContext("2d");

		this.chart = new Chart(ctx, {
			data: QM,
			options: options
		});

		//this.onChartClick(HTMLchart, chart, this.chartWidth, this.chartHeight, xTick, yTick);

	}

	/**
	 * Triggers when the quest map chart is clicked.
	 * Does nothing when no point has been clicked,
	 * Opens quest modal when quest point is clicked and;
	 * Opens add quest if plus point is clicked.
	 * 
	 * @param $event the event of the point clicked on the chart
	 */
	chartClicked($event) {
		var points: any = this.chart.getDatasetAtEvent($event);
		if (points.length != 0) {
			let x = points[0]._model.x / (this.chartWidth / this.xTick);
			let y = (this.chartHeight - points[0]._model.y) / (this.chartHeight / this.yTick);
			if (x % 5 == 0 && y % 5 == 0) {
				var questId = this.questMap.getQuestIdOf(x, y);
				var quests: Quest[] = this.quests.filter(quest => quest.getQuestId() == questId);
				if (quests.length > 0) {
					this.openQuest(quests[0]);
				}
			}
			console.log(x);
			console.log(y);
		}
		console.log(this.chart.getDatasetAtEvent($event));
		console.log(this.chart.getElementAtEvent($event));
	}

	/**
	 * Sets all the default less-related functions/properties of the component
	 */
	setDefault() {
		this.pageService.isProfilePage(false);
		this.currentUser = this.userService.getCurrentUser();
		this.currentSection = this.sectionService.getCurrentSection();
	}

	/**
	 * Obtains the user's navigated section
	 * @description Obtains the current section and stores it into 'currentSection' variable
	 */
	getCurrentSection() {
		this.currentSection = this.sectionService.getCurrentSection();
	}

	getCurrentUser() {
		//AHJ: unimplemented... or not sure. Di ko sure kung tama na ning pagkuha sa current user
		this.currentUser = new User(this.userService.getCurrentUser());
		console.log("currUser");
		console.log(this.currentUser);
	}

	acceptQuest() {
		console.warn("hello");
		let user_id = this.userService.getCurrentUser().getUserId();
		let quest_id = this.questClicked.getQuestId();
		let section_id = this.currentSection.getSectionId();

		this.questService.joinQuest(user_id, quest_id, section_id).subscribe((result) => {
			console.log("JOINED QUEST!!!");
			console.log(result);
			// this.questService.getUserJoinedQuests(user_id).subscribe(x => {
			// 	console.log("x");
			// 	console.log(x);
			// })
			this.sectionService.getUserSections(this.currentUser.getUserId(), this.currentSection.getSectionId()).subscribe(
				sections => {
					console.log(sections);
					this.sectionService.setCurrentSection(sections[0].section);
					this.currentSection = new Section(this.sectionService.getCurrentSection());
					console.log(this.currentSection);
				}
			)
		});

	}

	submitQuest(comment) {
		//AHJ: unimplemented; remove variable below if submitQuest properly implemented
		this.toaster.success(
			"Your quest have been submitted. Wait until it is graded.",
			"Quest Submission Success!"
		);
		console.log(this.commentBox);
		console.log(comment);
		let user_id = this.userService.getCurrentUser().getUserId();
		let quest_id = this.questClicked.getQuestId();
		let section_id = this.currentSection.getSectionId();
		
		this.questService.submitQuest("hello", this.commentBox, user_id, quest_id, section_id).subscribe((result) => {
			this.isQuestTakn = true;
			this.pending = true;
			this.questService.getUserJoinedQuests(user_id).subscribe(x => {
				console.log(x);
			})
		});
		this.questModalRef.hide();
	}

	abandonQuest() {
		console.warn("hello");
		this.toaster.warning(
			"You have abandoned a quest.",
			"Quest Abandoned!"
		);
		let user_id = this.userService.getCurrentUser().getUserId();
		let quest_id = this.questClicked.getQuestId();
		let section_id = this.currentSection.getSectionId();

		this.questService.abandonQuest(user_id, quest_id, section_id).subscribe((result) => {
			this.questService.getUserJoinedQuests(user_id).subscribe(x => {
				console.log(x);
			})
		});
		this.questModalRef.hide();
	}

	isParticipating(quest_id: string): boolean {
		let isParticipant = this.currentSection.isQuestParticipant(this.currentUser.getUserId(), quest_id);

		return isParticipant;
	}

	isQuestTaken(quest_id: string): boolean {
		let isQuestTaken = this.isQuestTakn;
		//AHJ: unimplemented; if questService.getQuestExp working, then uncomment comment below
		// let isQuestTaken =  this.questService.getQuestExp(this.currentUser.getUserId(), quest_id, this.currentSection.getSectionId()).map(
		// 	response => {
		// 		if(response){
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		// 	}
		// );
		// return isQuestTaken.isEmpty? false: isQuestTaken[0];
		return isQuestTaken;
	}
}
