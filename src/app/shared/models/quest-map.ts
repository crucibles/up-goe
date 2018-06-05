import { Quest } from "shared/models";

/**
 * A class that represents questmaps.
 */
export class QuestMap {

	private _id: String;
    private datasets;
    private questCoordinates: any[];

    constructor(data, quests: Quest[], hasPlusPoints?: boolean){
		this._id = data._id;
        this.setQuestMapDataSet(data, quests, hasPlusPoints);
    }

    getQuestMapDataSet(){
        return this.datasets;
	}
	
	getQuestMapId(){
		return this._id;
	}

    setQuestMapDataSet(data: any, quests: Quest[], hasPlusPoints){
		let questMapDetails = this.getQuestMapDetails(data.quest_coordinates);

		let exclude: any[] = questMapDetails.exclude;
		let questPositions = questMapDetails.questPositions;
		let minX: number = questMapDetails.minX;
		let maxX: number = questMapDetails.maxX;
		let basisY: number = 25;
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
            var title = quest.length == 0? "<No title>": quest[0].getQuestTitle();
			if (questPosition.type === "scatter") {
				dataset = {
					type: "scatter",
					label: title,
					data: [{
						x: questPosition.x,
						y: questPosition.y
					}],
					showLine: false
				};
				
				var coordinates: any = {
					questId: questPosition.questId,
					x: questPosition.x,
					y: questPosition.y
				};
				
				this.questCoordinates.push(coordinates);

				var scatterPoints: any[] = [];

				if(hasPlusPoints){
					scatterPoints = this.addQuestPlus(questPosition.x, questPosition.y, minX, maxX, basisY, exclude);
					if(scatterPoints.length != 0){
						for(let scatterPoint of scatterPoints){
							datasets.push(scatterPoint);
						}
					}
				}
                
			} else if (questPosition.type === "line") {
				dataset = {
					type: 'line',
					label: 'Line Dataset 1',
					data: [{
						x: questPosition.x,
						y: questPosition.y
					}, {
						x: questPosition.x1,
						y: questPosition.y1
					}],
					fill: false,
					radius: 0
				}
			}

			datasets.push(dataset);

		}

		dataset = {
			type: 'line',
			label: 'Line Dataset 1',
			data: [{
				x: minX,
				y: basisY
			}, {
				x: maxX,
				y: basisY
			}],
			fill: false,
			radius: 0
		}

		datasets.push(dataset);
        console.warn(datasets);
        
        this.datasets = datasets;
	}

	addQuestPlus(x: number, y: number, minX: number, maxX: number, basisY: number, exclude: any[]): any[] {
		let scatterPoints: any[] = [];

		let excludedPoints = exclude.filter(data =>
			data.x == x && data.y == y
		);
		let directions = ["N", "S", "E", "W"];
		for (let direction of directions) {
			if (y == basisY && (direction === "W" || (x < maxX && direction == "E"))) {
				console.log("excluded1");
				continue;
			} else if ((y > basisY && direction === "S") || (y < basisY && direction === "N")) {
				console.log("excluded2");
				continue;
			} else if (excludedPoints.filter(data => data.x == x && data.y == y && data.direction == direction).length != 0) {
				console.log("excluded3");
				continue;
			}
			let x1: number = x;
			let y1: number = y;
			if (direction == "N" || direction == "S") {
				y1 = direction === "N" ? y + 2 : y - 2;
			} else {
				x1 = direction === "E" ? x + 2 : x - 2;
			}

			let scatterPoint: any = {
				type: "scatter",
				label: "Add Quest",
				data: [{
					x: x1,
					y: y1
				}],
				showLine: false,
				pointStyle: "cross"
			}

			scatterPoints.push(scatterPoint);
		}

		console.log(scatterPoints);
		return scatterPoints;
	}

	addNewQuestLine(x, y, direction){
		switch(direction){
			case "N":
			break;
			case "W":
			break;
			case "E":
			
			break;
		}
    }
    
    private getQuestMapDetails(data: any[]): any {
		var lines: any[] = data;
		var i = 0;
		var dataArr: any[] = [];
		var exArr: any[] = [];
		var minX: number = 100;
		var maxX: number = 0;
		var basisY: number = 25;

		/*
		lineData[0] -> quest_id
		lineData[1] -> type
		lineData[2] -> x1
		lineData[3] -> y1
		lineData[4] -> line? x2 : exclude? direction (N, S, E, W)
		lineData[5] -> line? y2
		*/

		let questPoint: any;
		for (i = 0; i < lines.length; i++) {
			var lineData = lines[i];
			let x: number = parseInt(lineData.x1);
			let y: number = parseInt(lineData.y1);
			minX = minX < x && basisY == y ? minX : x;
			maxX = maxX > x && basisY == y ? maxX : x;

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
    
    getQuestIdOf(x, y){
        var quests = this.questCoordinates.filter(coordinate => coordinate.x == x && coordinate.y == y);
        var questId = quests.length == 0? "": quests[0].questId;
        return questId;
    }

}