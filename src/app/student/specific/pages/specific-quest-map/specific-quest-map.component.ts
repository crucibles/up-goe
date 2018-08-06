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
import Chart = require('chart.js');

import 'chartjs-plugin-datalabels';

import {
	FileUploader
} from 'ng2-file-upload/ng2-file-upload';

import {
	ToastsManager
} from 'ng2-toastr';

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
	QuestMap,
	Badge,
	Experience
} from 'shared/models';

import {
	PageService,
	SectionService,
	UserService,
	QuestService,
	LeaderboardService,
    ExperienceService,
	BadgeService
} from 'shared/services';

import {
	AlertService
} from 'shared/services/alert.service';

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
	private url = 'api/upload';
	public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'file' });

	sectionEXP: Experience;

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
	private badgeName: any = "";

	constructor(
		private experienceService: ExperienceService,
		private modalService: BsModalService,
		private pageService: PageService,
		private route: ActivatedRoute,
		private sectionService: SectionService,
		private userService: UserService,
		private alertService: AlertService,
		private questService: QuestService,
		private leaderboardService: LeaderboardService,
		private toaster: ToastsManager,
		private badgeService: BadgeService
	) {
		this.currentUser = this.userService.getCurrentUser();
		this.currentSection = new Section(this.sectionService.getCurrentSection());
		this.uploader = new FileUploader({ url: this.url, itemAlias: 'file' });

	}

	ngOnInit() {
		//override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
		this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
		//overide the onCompleteItem property of the uploader so we are 
		//able to deal with the server response.
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			this.toaster.success("Well done!", "Upload success!");
			this.submitQuest(JSON.parse(response));
		};

		this.setDefault();
		this.getCurrentUser();
		this.getCurrentSection();
		this.loadQuestMap();
	}

	isPending(quest_id) {
		return this.sectionEXP.isQuestGraded(quest_id);
	}

	isSubmitted(quest_id) {
		return this.sectionEXP.hasSubmittedQuest(quest_id);
	}

	getBadgeName(badge_id: any) {
		if(badge_id){
			this.badgeService.getBadge(badge_id).subscribe(res => {
				this.badgeName = new Badge(res).getBadgeName();
			});
		}
		this.badgeName = "";
	}

	getQuestScores() {
		var currentSection = this.currentSection.getSectionId();
		var currentQuest = this.questClicked.getQuestId();
		this.leaderboardService.getQuestScores(currentSection, currentQuest)
			.subscribe((user) => {
				if (user) {
					this.leaderboardRecords = user;
				} else {
					console.log('Failed to acquire quest scores.');
				}
			}, error => {
				this.alertService.error(error);
			});
	}

	loadQuestMap() {
		this.questService.getSectionQuests(this.currentSection.getSectionId()).subscribe(quests => {
			this.quests = quests.map(quest => new Quest(quest));
			this.experienceService.getSectionGrades(this.currentSection.getSectionId(), this.currentUser.getUserId())
				.subscribe(EXP => {
					if (EXP && EXP.length > 0) {
						this.sectionEXP = new Experience(EXP[0]);
					}
					this.questService.getSectionQuestMap(this.currentSection.getSectionId()).subscribe(questmap => {
						console.log("QUESTMAP LOADEd");
						console.log(questmap);
						this.questMap = new QuestMap(questmap, this.quests);
						console.log(this.questMap.getQuestInformationArray())
						this.setQuestMap();
					});
				});
		});

	}

	openQuest(quest: any) { //'quest: any' in here means the quest has not been converted to Quest type
		//AHJ: Unimplemented
		//WARNING!! Remove QUESTS in specific-qm.html when this is implemented
		this.questClicked = new Quest(quest);
		if (this.questClicked) {
			this.questModalRef = this.modalService.show(this.questTemplate);
			this.getQuestScores();
			this.getBadgeName(this.questClicked.getQuestBadge());

			this.experienceService.getCurrentExperience(
				this.questClicked.getQuestId(),
				this.currentUser.getUserId(),
				this.currentSection.getSectionId()
			).subscribe(res => {
				if (res == "true") {
					this.pending = false;
				} else if (res == "false") {
					this.pending = true;
				}
			});
		}
	}

	openLeaderBoardModal() {
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
			plugins: {
				datalabels: {
					display: true,
					color: 'red',
					font: {
						weight: 'bold'
					},
					formatter: function (value, context) {
						return context.chart.data.datasets[context.datasetIndex].label;
					},
					padding: 4
				}
			},
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
						return data.datasets[tooltipItem.datasetIndex].title;
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
		}
	}

	/**
	 * Sets all the default less-related functions/properties of the component
	 */
	setDefault() {
		this.pageService.isProfilePage(false);
		this.currentUser = new User(this.userService.getCurrentUser());
		this.currentSection = new Section(this.sectionService.getCurrentSection());
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
	}

	acceptQuest() {
		console.warn("hello");
		let user_id = this.userService.getCurrentUser().getUserId();
		let quest_id = this.questClicked.getQuestId();
		let section_id = this.currentSection.getSectionId();

		this.questService.joinQuest(user_id, quest_id, section_id).subscribe((result) => {
			this.setNewSection(quest_id);
			this.questModalRef.hide();
		});

	}

	setNewSection(quest_id) {
		this.sectionService.getUserSections(this.currentUser.getUserId(), this.currentSection.getSectionId()).subscribe(
			sections => {
				this.sectionService.setCurrentSection(sections[0].section);
				this.currentSection = new Section(this.sectionService.getCurrentSection());
			}
		);
	}

	submitQuest(res: any) {
		//AHJ: unimplemented; remove variable below if submitQuest properly implemented
		this.toaster.success(
			"Your quest have been submitted. Wait until it is graded.",
			"Quest Submission Success!"
		);
		let user_id = this.userService.getCurrentUser().getUserId();
		let quest_id = this.questClicked.getQuestId();
		let section_id = this.currentSection.getSectionId();

		this.questService.submitQuest(res, this.commentBox, user_id, quest_id, section_id).subscribe((result) => {
			this.isQuestTakn = true;
			this.pending = true;
			this.commentBox = "";
			this.setNewExperience();
			this.questModalRef.hide();
		});
	}

	setNewExperience() {
		this.experienceService.getSectionGrades(this.currentSection.getSectionId(), this.currentUser.getUserId())
			.subscribe(EXP => {
				if (EXP && EXP.length > 0) {
					this.sectionEXP = new Experience(EXP[0]);
				}
			});
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
			// this.questService.getUserJoinedQuests(user_id).subscribe(x => {
			// 	console.log(x);
			// })
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
