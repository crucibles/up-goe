//Core Imports
import {
	HttpClient
} from '@angular/common/http';

import {
	Component,
	OnInit,
	ViewChild,
	TemplateRef,
	Input,
	AfterViewInit,
	AfterViewChecked,
	ElementRef
} from '@angular/core';

import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';

import {
	ActivatedRoute, ParamMap
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
	QuestMap,
	Badge
} from 'shared/models';

import {
	Chart
} from 'chart.js';

import {
	FileService,
	PageService,
	QuestService,
	SectionService,
	UserService,
	BadgeService
} from 'shared/services';

@Component({
	selector: 'app-specific-quest-map',
	templateUrl: './specific-quest-map.component.html',
	styleUrls: ['./specific-quest-map.component.css']
})
export class SpecificQuestMapComponent implements OnInit, AfterViewInit {
	/**
	 * Stores the x-coordinate of the recently clicked point in the questmap chart
	 */
	x: any;

	/**
	 * Stores the y-coordinate of the recently clicked point in the questmap chart
	 */
	y: any;

	// basic info
	private currentSection: Section;
	currentUser: User;

	//modal
	@ViewChild('questTemplate') questTemplate: TemplateRef<any>;
	@ViewChild('createQuestTemplate') createQuestTemplate: TemplateRef<any>;
	@ViewChild('chartCanvas') chartCanvas: ElementRef;
	private isCreateModalReady: boolean = false;
	private bsModalRef: BsModalRef;
	private createQuestForm: FormGroup;

	// quests
	private questClicked: Quest;
	private quests: Quest[];

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

	// create quest details
	questBadges: any[] = [];

	constructor(
		private badgeService: BadgeService,
		private fileService: FileService,
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private modalService: BsModalService,
		private questService: QuestService,
		private pageService: PageService,
		private route: ActivatedRoute,
		private sectionService: SectionService,
		private userService: UserService

	) {
		console.log("QUEST MAP");
		this.currentUser = this.userService.getCurrentUser();
	}

	ngOnInit() {
		console.log("Quest map");
		this.isCreateModalReady = false;
		this.setDefault();
		this.getCurrentUser();
		this.getCurrentSection();
		this.createBadgeArray();
	}

	ngAfterViewInit() {
		console.log("after view")
		this.loadQuestMap();
	}

	createBadgeArray() {
		let badges: Badge[] = [];
		this.badgeService.getSectionBadges(this.currentSection.getSectionId()).subscribe(
			badges => {
				badges = badges.map(badge => new Badge(badge));
				this.questBadges = badges.map(function week(badge) {
					let obj = {
						badgeId: badge.getBadgeId(),
						badgeName: badge.getBadgeName(),
						badgeDescription: badge.getBadgeDescription(),
						isChecked: false
					}
					return obj;
				});

				this.initializeForm();
			}
		);
	}

	initializeForm() {
		this.createQuestForm = this.formBuilder.group({
			questTitle: new FormControl("", Validators.required),
			questDescription: new FormControl(""),
			questRetakable: new FormControl("Y", Validators.required),
			questEXP: new FormControl("", [Validators.required, Validators.pattern("[0-9]+")]),
			questHP: new FormControl("", Validators.pattern("[0-9]+")),
			questBadges: this.buildBadges(),
			questEndDate: new FormControl("", Validators.required)
		});

		this.isCreateModalReady = true;
	}

	buildBadges() {
		const arr = this.questBadges.map(badge => {
			return this.formBuilder.group({
				badge: badge.badgeId,
				badgeName: badge.badgeName,
				badgeDescription: badge.badgeDescription,
				isChecked: false
			})
		});
		console.log(this.formBuilder.array(arr))
		return this.formBuilder.array(arr);
	}

	loadQuestMap() {
		console.log(this.currentSection);
		this.questService.getSectionQuests(this.currentSection.getSectionId()).subscribe(quests => {
			console.log("QUEST LOADED");
			console.log(quests);
			this.quests = quests.map(quest => new Quest(quest));
			this.questService.getSectionQuestMap(this.currentSection.getSectionId()).subscribe(questmap => {
				console.log("QUESTMAP LOADEd");
				console.log(questmap);
				this.questMap = new QuestMap(questmap, this.quests, true);
				this.setQuestMap();
			});
		});
	}

	openQuest(quest: any) { //'quest: any' in here means the quest has not been converted to Quest type
		//AHJ: Unimplemented
		//WARNING!! Remove QUESTS in specific-qm.html when this is implemented
		console.log(quest);
		this.questClicked = new Quest(quest);
		if (this.questClicked) {
			this.bsModalRef = this.modalService.show(this.questTemplate);
		}
	}

	/**
	 * Sets all the default less-related functions/properties of the component
	 */
	setDefault() {
		this.pageService.isProfilePage(false);
	}

	/**
	 * Obtains the user's navigated section
	 * @description Obtains the current section and stores it into 'currentSection' variable
	 */
	getCurrentSection() {
		this.currentSection = this.sectionService.getCurrentSection();
		console.log(this.currentSection);
	}

	getCurrentUser() {
		//AHJ: unimplemented... or not sure. Di ko sure kung tama na ning pagkuha sa current user
		this.currentUser = new User(this.userService.getCurrentUser());
		console.log("currUser");
		console.log(this.currentUser);
	}

	acceptQuest() {
		//AHJ: unimplemented
		this.bsModalRef.hide();
	}

	submitQuest() {
		//AHJ: unimplemented
		this.bsModalRef.hide();
	}

	abandonQuest() {
		//AHJ: unimplemented
		this.bsModalRef.hide();
	}

	isParticipating(quest_id: string): boolean {
		let isParticipant = this.currentSection.isQuestParticipant(this.currentUser.getUserId(), quest_id);
		return isParticipant;
	}

	pointClicked(event: Event) {
		console.log("clicked!");
		let activePoint = this.chart.getElementAtEvent(event);
		var selectedPoint = activePoint[0];
		selectedPoint.custom = selectedPoint.custom || {};
		selectedPoint.custom.backgroundColor = 'rgba(128,128,128,1)';
		selectedPoint.custom.radius = 7;
	}

	resetQuest() {
		this.createQuestForm.reset();
	}

	/**
    * Sets the quest map based on the data received.
	* @param data string where the quests and its respective coordinates will be located
    */
	setQuestMap() {
		console.log("SET QUESTMAP");
		this.chartColors = this.pageService.lineChartColors;
		this.chartWidth = 650;
		this.chartHeight = 300;

		console.log("this.questMap.getQuestMapDataSet()");
		console.log(this.questMap.getQuestMapDataSet());

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
			}
		}

		var HTMLchart = document.getElementById("quest-map");
		console.log(this.chartCanvas);
		var ctx = (<HTMLCanvasElement>HTMLchart).getContext("2d");
		//var ctx: CanvasRenderingContext2D = this.chartCanvas.nativeElement.getContext("2d");

		this.chart = new Chart(ctx, {
			data: QM,
			options: options
		});

		//this.onChartClick(HTMLchart, chart, this.chartWidth, this.chartHeight, xTick, yTick);

	}

	/**
	 * https://stackoverflow.com/questions/38112802/how-to-save-a-text-to-file-and-read-it-again-but-save-as-binary-in-javascript
	 * https://codepen.io/sandeep821/pen/JKaYZq
	 * https://stackoverflow.com/questions/41547945/write-to-a-local-file-using-angular2-typescript-locally
	 * https://stackoverflow.com/questions/33643107/read-and-write-a-text-file-in-typescript
	 * https://www.google.com.ph/search?safe=active&biw=1366&bih=637&ei=zi_1Wv6jLcOa8wWgk4CIAg&q=save+text+to+file+typescript&oq=save+text+to+file+typescript&gs_l=psy-ab.3..33i22i29i30k1.241604.250182.0.250343.36.29.1.3.3.0.251.3658.0j13j7.20.0....0...1c.1.64.psy-ab..13.23.3600...0j0i67k1j0i131i67k1j0i131k1j0i10k1j0i22i30k1.0.SX3c2O49JSI
	 */

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
		var points: any = this.chart.getDatasetAtEvent($event);
		if (points.length != 0) {
			this.x = points[0]._model.x / (this.chartWidth / this.xTick);
			this.y = (this.chartHeight - points[0]._model.y) / (this.chartHeight / this.yTick);
			console.log(this.questMap.getQuestIdOf(this.x, this.y));
			if ((this.x % 5 != 0 || this.y % 5 !== 0) || this.questMap.getQuestIdOf(this.x, this.y) == "") {
				this.openCreateQuestModal();
			} else {
				var questId = this.questMap.getQuestIdOf(this.x, this.y);
				var quests: Quest[] = this.quests.filter(quest => quest.getQuestId() == questId);
				if (quests.length > 0) {
					this.openQuest(quests[0]);
				}
			}
			console.log(this.x);
			console.log(this.y);
		}
		console.log(this.chart.getDatasetAtEvent($event));
		console.log(this.chart.getElementAtEvent($event));
	}

	openCreateQuestModal() {
		this.bsModalRef = this.modalService.show(this.createQuestTemplate);
	}

	createQuest() {
		console.log(this.questTitle.value);
		console.log(this.questDescription.value);
		console.log(this.questRetakable.value);
		console.log(this.questEndDate.value)
		let questBadgesArr = [];
		this.questBadges.forEach(badge => {
			if (badge.isChecked) {
				questBadgesArr.push(badge.badgeId);
			}
		})
		console.log(questBadgesArr);
		console.log(this.createQuestForm);
		let newQuest: Quest = new Quest();
		//newQuest.setQuest()
		this.questService.createQuest(
			this.currentSection.getSectionId(),
			this.questTitle.value,
			this.questDescription.value,
			this.questRetakable.value,
			questBadgesArr,
			"",
			this.questEXP.value,
			this.questHP.value,
			new Date(),
			this.questEndDate.value,
			"",
			""
		).subscribe(quest => {
			console.log("RECEIVED quest");
			console.log(quest);
			quest = new Quest(quest);
			console.log(quest);
			this.addNewQuestLine(quest);
		});
	}

	roundOff(num: number) {
		num = num % 5 > 2 ? Math.ceil(num / 5) : Math.floor(num / 5);
		return num * 5;
	}

	addNewQuestLine(quest) {
		console.log("addnewquest");
		//AHJ: unimplemented; add to database so questmap is refreshed
		console.log(this.x);
		console.log(this.y);
		let basisX = this.roundOff(this.x);
		let basisY = this.roundOff(this.y);
		console.log(basisX);
		console.log(basisY);
		let newQuestCoordinates: any[] = [];
		if (this.x % 5 != 0 || this.y % 5 != 0) {
			let isNorth: boolean = this.y - basisY > 0 ? true : false;
			let isEast: boolean = this.x - basisX > 0 ? true : false;

			let x2 = basisX;
			let y2 = basisY;

			if (basisX - this.x != 0) {
				x2 = isEast ? x2 + 5 : x2 - 5;
			}

			//if added quest point is either North or South (for adding excluded plus points)
			if (basisY - this.y != 0) {
				let direction = isNorth ? "N" : "S";
				newQuestCoordinates.push({
					type: "exclude",
					x1: basisX,
					y1: basisY,
					direction: direction
				});
				y2 = isNorth ? y2 + 5 : y2 - 5;
			}

			let coord: any = {
				type: "line",
				x1: basisX,
				y1: basisY,
				x2: x2,
				y2: y2
			};
			newQuestCoordinates.push(coord);

			coord = {
				quest_id: quest._id,
				type: "scatter",
				x1: x2,
				y1: y2
			}
			newQuestCoordinates.push(coord);

			if (newQuestCoordinates.length > 0) {
				this.questService.addQuestMapCoordinates(this.currentSection.getSectionId(), this.questMap.getQuestMapId(), newQuestCoordinates).subscribe(questmap => {
					console.log(questmap);
				});
			}
		} else {
			this.questService.editQuestMapCoordinateAt(this.currentSection.getSectionId(), this.questMap.getQuestMapId(), quest._id, basisX, basisY).subscribe(() => {
				console.log("done editing qm coord!");
			})
		}
	}

	addData(chart, label, data) {
		chart.data.labels.push(label);
		chart.data.datasets.forEach((dataset) => {
			dataset.data.push(data);
		});
		chart.update();
	}

	get questBadgesArray(): FormArray {
		return this.createQuestForm.get('questBadges') as FormArray;
	}

	get questDescription(): FormArray {
		return this.createQuestForm.get('questDescription') as FormArray;
	}

	get questRetakable() {
		return this.createQuestForm.get('questRetakable');
	}

	get questTitle() {
		return this.createQuestForm.get('questTitle');
	}

	get questEndDate() {
		return this.createQuestForm.get('questEndDate');
	}

	get questEXP() {
		return this.createQuestForm.get('questEXP');
	}

	get questHP() {
		return this.createQuestForm.get('questHP');
	}
}
