import { Quest } from "shared/models";

/**
 * A class that represents questmaps.
 */
export class QuestMap {

	private _id: String;
	private datasets;
	private minX: number;
	private maxX: number;
	private mainquestY: number;
	private questCoordinates: any[];

	constructor(data, quests: Quest[], hasPlusPoints?: boolean) {
		this._id = data._id;
		this.mainquestY = 25;
		this.setQuestMapDataSet(data, quests, hasPlusPoints);
	}

	getQuestMapDataSet() {
		return this.datasets;
	}

	getQuestMapId() {
		return this._id;
	}

	setQuestMapDataSet(data: any, quests: Quest[], hasPlusPoints) {
		let questMapDetails = this.getQuestMapDetails(data.quest_coordinates);

		let exclude: any[] = questMapDetails.exclude;
		let questPositions = questMapDetails.questPositions;
		let minX: number = questMapDetails.minX;
		let maxX: number = questMapDetails.maxX;
		let mainquestY: number = this.mainquestY;
		let dataset: any;
		var datasets: any[] = [];

		this.questCoordinates = [];

		for (let questPosition of questPositions) {
			console.log("HERE<<<<<<<<<<<<<<<<<<<<<<<<");
			console.log(questPosition.questId);
			console.log(quests.map(quest => quest.getQuestId()));
			console.log("HERE<<<<<<<<<<<<<<<<<<<<<<<<");
			let quest = quests.filter(quest => quest.getQuestId() == questPosition.questId);
			console.log("RESULT form filter:");
			console.log(quest);
			var title = quest.length == 0 ? "<No title>" : quest[0].getQuestTitle();
			if (questPosition.type === "scatter") {
				dataset = {
					type: "scatter",
					label: title,
					data: [{
						x: questPosition.x,
						y: questPosition.y
					}],
					backgroundColor: "#000",
					borderColor: "#000",
					radius: 5,
					showLine: false
				};

				var coordinates: any = {
					questId: questPosition.questId,
					x: questPosition.x,
					y: questPosition.y
				};

				this.questCoordinates.push(coordinates);

				var scatterPoints: any[] = [];

				if (hasPlusPoints) {
					scatterPoints = this.addQuestPlus(questPosition.x, questPosition.y, minX, maxX, mainquestY, exclude);
					if (scatterPoints.length != 0) {
						for (let scatterPoint of scatterPoints) {
							datasets.push(scatterPoint);
						}
					}
				}

			} else if (questPosition.type === "line") {
				dataset = {
					type: 'line',
					label: '',
					data: [{
						x: questPosition.x,
						y: questPosition.y
					}, {
						x: questPosition.x1,
						y: questPosition.y1
					}],
					fill: false,
					radius: 0,
					borderWidth: 4,
					borderColor: "#000"
				}
			}

			datasets.push(dataset);

		}

		dataset = {
			type: 'line',
			label: '',
			data: [{
				x: minX,
				y: mainquestY
			}, {
				x: maxX,
				y: mainquestY
			}],
			fill: false,
			radius: 0,
			borderWidth: 4,
			borderColor: "#000"
		}

		datasets.push(dataset);
		console.warn(datasets);

		this.datasets = datasets;
	}

	/**
	 * Adds surrounding'+' points to the performance graph based on the given point.
	 * @param x x-coordinate of the basis point
	 * @param y y-coordinate of the basis point
	 * @param minX minimum x-value of the graph
	 * @param maxX maximum x-value of the graph
	 * @param mainquestY y-coordinate of the main quest line
	 * @param exclude array of points with respective direction to exclude
	 */
	addQuestPlus(x: number, y: number, minX: number, maxX: number, mainquestY: number, exclude: any[]): any[] {
		let scatterPoints: any[] = [];

		let excludedPoints = exclude.filter(data =>
			data.x == x && data.y == y
		);
		let directions = ["N", "S", "E"];
		for (let direction of directions) {
			console.log(x);
			console.log(y);
			console.log(direction);
			// The following if-conditions are the cases that disallows '+' symbols to be added

			// if current point is a main quest, current x is not the latest main quest, and direction is towards east
			if (y == mainquestY && (x < maxX && direction == "E")) {
				console.log("excluded1");
				continue;

				// if point to be added is not a main quest and direction is either north or south
			} else if ((y > mainquestY && direction === "S") || (y < mainquestY && direction === "N")) {
				console.log("excluded2");
				continue;

				// explicitly disallowed '+' point (for cases such as north/south new points from main point)
			} else if (excludedPoints.filter(data => data.x == x && data.y == y && data.direction == direction).length != 0) {
				console.log("excluded3");
				continue;
			}

			// determines the new '+' point's location
			let x1: number = x;
			let y1: number = y;
			if (direction == "N" || direction == "S") {
				y1 = direction === "N" ? y + 2 : y - 2;
			} else {
				x1 = x + 2;
			}

			// add to chart if there is no point existing at this point
			if (!this.hasExistingPointAt(x1, y1)) {
				let scatterPoint: any = {
					type: "scatter",
					label: "Add Quest",
					data: [{
						x: x1,
						y: y1
					}],
					showLine: false,
					pointStyle: "cross",
					radius: 3,
					backgroundColor: "#000",
					borderColor: "#000"
				}
				scatterPoints.push(scatterPoint);
			}
		}

		console.log(scatterPoints);
		return scatterPoints;
	}

	/**
	 * Round off the number to the nearest 5.
	 * @param num number to round off
	 */
	roundOff(num: number) {
		num = num % 5 > 2 ? Math.ceil(num / 5) : Math.floor(num / 5);
		return num * 5;
	}

	addNewQuestLine(x, y, quest): any[] {
		let newQuestCoordinates: any[] = [];
		let basisX = this.roundOff(x);
		let basisY = this.roundOff(y);

		console.log(basisX);
		console.log(basisY);

		let isNorth: boolean = y - basisY > 0 ? true : false;
		let isEast: boolean = x - basisX > 0 ? true : false;

		let x2 = basisX;
		let y2 = basisY;

		if (isEast) {
			//if added quest is not a main quest and goes east
			if (basisY != this.mainquestY) {
				newQuestCoordinates.push({
					type: "exclude",
					x1: basisX,
					y1: basisY,
					direction: "E"
				});
			}
			x2 += 5;
		}

		//if added quest point's direction is either towards north or south (for adding excluded plus points)
		if (basisY - y != 0) {
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

		// if no quest exists on the newly created destination quest point
		if (this.getQuestIdOf(x2, y2) == "") {
			coord = {
				quest_id: quest._id,
				type: "scatter",
				x1: x2,
				y1: y2
			}
			newQuestCoordinates.push(coord);
		}

		return newQuestCoordinates;
	}

	private getQuestMapDetails(data: any[]): any {
		var lines: any[] = data;
		var i = 0;
		var dataArr: any[] = [];
		var exArr: any[] = [];
		var minX: number = 100;
		var maxX: number = 0;
		var mainquestY: number = 25;

		let questPoint: any;
		for (i = 0; i < lines.length; i++) {
			var lineData = lines[i];
			let x: number = parseInt(lineData.x1);
			let y: number = parseInt(lineData.y1);

			if (mainquestY == y) {
				minX = minX < x ? minX : x;
				maxX = maxX > x ? maxX : x;
			}

			if (lineData.type === "scatter") {
				questPoint = {
					questId: lineData.quest_id,
					type: lineData.type,
					x: x,
					y: y,
				}
			} else if (lineData.type === "line") {
				questPoint = {
					type: lineData.type,
					x: x,
					y: y,
					x1: parseInt(lineData.x2),
					y1: parseInt(lineData.y2),
				}
			} else if (lineData.type === "exclude") {
				let exclude: any = {
					type: lineData.type,
					x: x,
					y: y,
					direction: lineData.direction
				}
				exArr.push(exclude);
				continue;
			}

			dataArr.push(questPoint);
		}

		var questMapDetails: any = {
			maxX: maxX,
			minX: minX,
			questPositions: dataArr,
			exclude: exArr
		}
		return questMapDetails;
	}

	/**
	 * Determines whether point exists in the given coordinates.
	 * @param x x-coordinate of the point to check
	 * @param y y-coordinate of the point to check
	 */
	private hasExistingPointAt(x, y) {
		return this.questCoordinates.filter(coordinate => coordinate.x == x && coordinate.y == y).length > 0;
	}

	getQuestIdOf(x, y) {
		var quests = this.questCoordinates.filter(coordinate => coordinate.x == x && coordinate.y == y);
		var questId = quests.length == 0 ? "" : quests[0].questId;
		return questId;
	}

}