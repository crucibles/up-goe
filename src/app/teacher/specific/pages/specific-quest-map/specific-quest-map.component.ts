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
	Chart
} from 'chart.js';

import 'chartjs-plugin-datalabels';

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
	Badge
} from 'shared/models';

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
	// basic info
	private currentSection: Section;
	currentUser: User;

	/**
	 * Stores the x-coordinate of the recently clicked point in the questmap chart
	 */
	x: any;

	/**
	 * Stores the y-coordinate of the recently clicked point in the questmap chart
	 */
	y: any;

	isFromHTML: boolean = false;


	//modal
	@ViewChild('questTemplate') questTemplate: TemplateRef<any>;
	@ViewChild('createQuestTemplate') createQuestTemplate: TemplateRef<any>;
	private isCreateModalReady: boolean = false;
	private bsModalRef: BsModalRef;
	private createQuestForm: FormGroup;

	// quests details
	private questClicked: Quest;
	private quests: Quest[];

	// quest map details
	questMap: QuestMap;

	// create quest details
	questBadges: any[] = [];

	// quest map chart
	xTick: number;
	yTick: number;
	chart: Chart;
	chartColors: Array<any>;
	chartLabels: Array<any> = [];
	chartWidth: number;
	chartHeight: number;

	badgeName: any = "";
	maxEXP: number;


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
		private toastr: ToastsManager,
		private userService: UserService

	) {
		this.currentUser = this.userService.getCurrentUser();
	}

	ngOnInit() {
		this.isCreateModalReady = false;
		this.setDefault();
		this.getCurrentUser();
		this.getCurrentSection();
		this.createBadgeArray();
	}

	ngAfterViewInit() {
		this.loadQuestMap();
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

	/**
	 * Creates badge array for the create-quest form.
	 * 
	 * @author Sumandang, AJ Ruth H.
	 */
	createBadgeArray() {
		console.warn("createing badge array");
		let badges: Badge[] = [];
		this.badgeService.getSectionBadges(this.currentSection.getSectionId()).subscribe(
			badges => {
				console.warn(badges);
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

	/**
	 * Initializes create-quest form.
	 */
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

	/**
	 * Build badge's formbuilder array.
	 */
	buildBadges() {
		const arr = this.questBadges.map(badge => {
			return this.formBuilder.group({
				badge: badge.badgeId,
				badgeName: badge.badgeName,
				badgeDescription: badge.badgeDescription,
				isChecked: false
			})
		});
		return this.formBuilder.array(arr);
	}

	/**
	 * Loads quest map.
	 * Includes loading of quests and retrieval of quest map.
	 * 
	 * @author Sumandang, AJ Ruth
	 */
	loadQuestMap() {
		this.questService.getSectionQuests(this.currentSection.getSectionId()).subscribe(quests => {
			this.quests = quests.map(quest => new Quest(quest));
			this.questService.getSectionQuestMap(this.currentSection.getSectionId()).subscribe(questmap => {
				this.questMap = new QuestMap(questmap, this.quests, true);
				this.setQuestMap();
			});
		});
	}

	/**
	 * Open quest modal and display clicked quest details.
	 * @param quest quest to display
	 * 
	 * @author Sumandang, AJ Ruth
	 */
	openQuest(quest: any) { //'quest: any' in here means the quest has not been converted to Quest type
		//AHJ: Unimplemented
		//WARNING!! Remove QUESTS in specific-qm.html when this is implemented
		this.questClicked = new Quest(quest);
		this.getBadgeName(this.questClicked.getQuestBadge());
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

	resetQuest() {
		this.createQuestForm.reset();
	}

	setMaxEXP(maxEXP: number) {
		if (maxEXP <= 0) {
			this.toastr.error(
				"You must input a max EXP greater than 0!",
				"Max EXP Error!"
			);
		} else {
			this.questService.setMaxEXP(this.questMap.getQuestMapId(), maxEXP).subscribe((x) => {
				if (x) {
					this.toastr.success(
						"Successfully set the section max EXP to " + maxEXP,
						"Grade Submission Success!"
					);
					this.questMap.setMaxEXP(maxEXP);
				} else {
					this.toastr.error(
						"The system failed to set your max EXP.",
						"Max EXP Error!"
					);
				}
			})
		}
	}

	/**
    * Sets the quest map based on the data received.
	* @param data string where the quests and its respective coordinates will be located
    */
	setQuestMap() {
		this.chartColors = this.pageService.lineChartColors;
		this.chartWidth = 500;
		this.chartHeight = 500;


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
	 * @see openCreateQuestModal
	 * @see openQuest
	 */
	chartClicked($event) {
		var points: any = this.chart.getDatasetAtEvent($event);
		if (points.length != 0) {
			this.x = points[0]._model.x / (this.chartWidth / this.xTick);
			this.y = (this.chartHeight - points[0]._model.y) / (this.chartHeight / this.yTick);
			console.log(points);
			if ((this.x % 5 != 0 || this.y % 5 !== 0) || this.questMap.getQuestIdOf(this.x, this.y) == "") {
				if (!this.questMap.hasQuestPointAtDirection(this.x, this.y)) {
					this.openCreateQuestModal();
				} else {
					this.addNewQuestLine();
				}
			} else {
				var questId = this.questMap.getQuestIdOf(this.x, this.y);
				var quests: Quest[] = this.quests.filter(quest => quest.getQuestId() == questId);
				if (quests.length > 0) {
					this.openQuest(quests[0]);
				}
			}
		}
	}

	openCreateQuestModal(isFromHTML?: boolean) {
		if (isFromHTML) {
			this.x = 5;
			this.y = 25;
			this.isFromHTML = true;
		} else {
			this.isFromHTML = false;
		}
		this.bsModalRef = this.modalService.show(this.createQuestTemplate);
	}

	createQuest() {
		let questBadgesArr = [];

		this.createQuestForm.value.questBadges.forEach(badge => {
			if (badge.isChecked) {
				questBadgesArr.push(badge.badge);
			}
		})
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
			quest = new Quest(quest);
			this.quests.push(quest);
			this.addNewQuestLine(quest);
			this.bsModalRef.hide();
			this.resetQuest();
		});
	}

	getBadgeName(badge_id: any) {
		if(badge_id){
			this.badgeService.getBadge(badge_id).subscribe(res => {
				this.badgeName = new Badge(res).getBadgeName();
			});
		}
		this.badgeName = "";
	}

	addNewQuestLine(quest?) {
		//AHJ: unimplemented; add to database so questmap is refreshed
		// if the clicked point is a '+' sign
		if (this.x % 5 != 0 || this.y % 5 != 0) {
			let newQuestCoordinates: any[] = this.questMap.addNewQuestLine(this.x, this.y, quest);

			if (newQuestCoordinates.length > 0) {
				this.questService.addQuestMapCoordinates(this.currentSection.getSectionId(), this.questMap.getQuestMapId(), newQuestCoordinates).subscribe(questmap => {
					this.questService.getSectionQuestMap(this.currentSection.getSectionId()).subscribe(questmap => {
						this.questMap = new QuestMap(questmap, this.quests, true);
						this.chart.config.data.datasets = this.questMap.getQuestMapDataSet();
						this.chart.update();
					});
				});
			}

			// if clicked point is a quest point
		} else {
			let basisX = this.roundOff(this.x);
			let basisY = this.roundOff(this.y);

			if (this.isFromHTML) {
				this.questMap.editQuestMapCoordinateAt(basisX, basisY, quest._id);
			}

			this.questService.editQuestMapCoordinateAt(this.currentSection.getSectionId(), this.questMap.getQuestMapId(), quest._id, basisX, basisY).subscribe(() => {
				this.questService.getSectionQuestMap(this.currentSection.getSectionId()).subscribe(questmap => {
					this.questMap = new QuestMap(questmap, this.quests, true);
					this.chart.config.data.datasets = this.questMap.getQuestMapDataSet();
					this.chart.update();
				});
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

	/**
	 * Round off the number to the nearest 5.
	 * @param num number to round off
	 */
	roundOff(num: number) {
		num = num % 5 > 2 ? Math.ceil(num / 5) : Math.floor(num / 5);
		return num * 5;
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
