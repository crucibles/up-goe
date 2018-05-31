/**
 * A class to represent inventories
 * @class
 *
 * @property quest_id identification string of the quest
 * @property quest_title quest's title/name
 * @property quest_descrption quest's description on 
 * what is the quest all about and what needs to be achieved
 * @property quest_retakable identifies if a quest is retakable or not;
 * true if retakable and false if otherwise
 * @property quest_badge badge to be obtained if quest is accomplished
 * @property quest_items[] items to be obtained if quest is accomplished
 * @property quest_hp the item's addition to the the user's health points if quest successfully accomplished
 * @property quest_xp the item's addition to the the user's exp points if quest successfully accomplished
 * @property quest_start_date time and date the quest had started/created
 * @property quest_end_date time and date of the quest's deadline
 * @property quest_party identifies if a quest requires party or not;
 * true if it requires party and false if otherwise
 * @property quest_prerequisite the list of quest names that must be accomplished before this quest can be added
 * 
*/
export class Quest {
    private _id: string;
    private quest_title: string;
    private quest_description: string;
    private quest_retakable: boolean;
    private quest_badge: string;
    private quest_item: string[];
    private quest_xp: number;
    private quest_hp: number;
    private quest_start_date: Date;
    private quest_end_date: Date;
    private quest_party: boolean;
    private quest_prerequisite: string[];

    constructor(
        quest?: any
    ) {
        if (quest) {
            this._id = quest._id;
            this.quest_title = quest.quest_title ? quest.quest_title : "";
            this.quest_description = quest.quest_description ? quest.quest_description : "";
            this.quest_retakable = quest.quest_retakable ? quest.quest_retakable : false;
            this.quest_badge = quest.quest_badge ? quest.quest_badge : "";
            this.quest_item = quest.quest_item ? quest.quest_item : [];
            this.quest_xp = quest.quest_xp ? quest.quest_xp : 0;
            this.quest_hp = quest.quest_hp ? quest.quest_hp : 0;
            this.quest_start_date = quest.quest_start_date ? new Date(quest.quest_start_date) : new Date();
            this.quest_end_date = quest.quest_end_date ? new Date(quest.quest_end_date) : new Date();
            this.quest_party = quest.quest_party ? quest.quest_party : false;
            this.quest_prerequisite = quest.quest_prerequisite ? quest.quest_prerequisite : [];
        } else {
            this.quest_title = "";
            this.quest_description = "";
            this.quest_retakable = false;
            this.quest_badge = "";
            this.quest_item = [];
            this.quest_xp = 0;
            this.quest_hp = 0;
            this.quest_start_date = new Date();
            this.quest_end_date = new Date();
            this.quest_party = false;
            this.quest_prerequisite = [];
        }
    }

    setQuest(
        quest_title,
        quest_description,
        quest_retakable,
        quest_badge,
        quest_item,
        quest_xp,
        quest_hp,
        quest_start_date,
        quest_end_date,
        quest_party,
        quest_prerequisite
    ) {
        this.quest_title = quest_title;
        this.quest_description = quest_description;
        this.quest_retakable = quest_retakable;
        this.quest_badge = quest_badge;
        this.quest_item = quest_item;
        this.quest_xp = quest_xp;
        this.quest_hp = quest_hp;
        this.quest_start_date = new Date(quest_start_date);
        this.quest_end_date = new Date(quest_end_date);
        this.quest_party = quest_party;
        this.quest_prerequisite = quest_prerequisite;
    }

    getQuestId() {
        return this._id;
    }

    getQuestTitle() {
        return this.quest_title;
    }

    getQuestDescription() {
        return this.quest_description;
    }

    getQuestRetakable() {
        return this.quest_retakable;
    }

    getQuestBadge() {
        return this.quest_badge;
    }

    getQuestItem() {
        return this.quest_item;
    }

    getQuestXp() {
        return this.quest_xp;
    }

    getQuestHp() {
        return this.quest_hp;
    }

    getQuestStartTimeDate() {
        return this.quest_start_date;
    }

    getQuestFormatTime(date_obj) {
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

    getQuestEndTimeDate() {
        return this.quest_end_date;
    }

    getQuestParty() {
        return this.quest_party;
    }

    getQuestPrerequisite() {
        return this.quest_prerequisite;
    }

    getQuestTimePercentage(): string {
        let timePerc: number = 100 - this.timeDifference(this.quest_end_date, new Date()) / this.timeDifference(this.quest_end_date, this.quest_start_date) * 100;
        let totalMinRem: number = this.timeDifference(this.quest_end_date, new Date());
        let hourRem: number = Math.floor(totalMinRem / 1000 / 60 / 60);

        let string = this.getTimeLabel(totalMinRem, hourRem);
        if (totalMinRem <= 0) {
            timePerc = 100;
        }

        return timePerc.toString() + '%';
    }

    /**
	 * Returns the appropriate progress bar label
	 * @description Returns the appropriate progress bar label based on either the total minutes 
	 * remaining or the hours remaining
	 * @param totalMinRem the total minutes remaining for the quest
	 * @param hourRem the hours remaining for the quest
	 * 
	 * @returns string label for the progress bar
	 */
	getQuestTimeLabel(): string {
        let totalMinRem: number = this.timeDifference(this.quest_end_date, new Date());
        let hourRem: number = Math.floor(totalMinRem / 1000 / 60 / 60);

		let string = "";
		if (totalMinRem <= 0) {
			string = "Time's up!";
		} else if (hourRem >= 168) {
			let weekRem: number = Math.floor(totalMinRem / 1000 / 60 / 60 / 128);
			let dayRem = Math.floor(totalMinRem / 1000 / 60 / 60 % 128);
			string = weekRem.toString() + " wk(s) & " + dayRem.toString() + " dy(s) left";
		} else if (hourRem >= 24) {
			let dayRem: number = Math.floor(totalMinRem / 1000 / 60 / 60 / 24);
			hourRem = Math.floor(totalMinRem / 1000 / 60 / 60 % 24);
			string = dayRem.toString() + " dy(s) & " + hourRem.toString() + " hr(s) left";
		} else {
			let minRem: number = Math.floor(totalMinRem / 1000 / 60 % 60);
			string = hourRem.toString() + " hr(s) & " + minRem.toString() + " mn(s) left";
		}
		return string;
    }
    
    /** 
	 * @summary changes the color of the progress bar by changing its class
	 * 
	 * @param hourRem hours remaining for quest of index i
	 * @param i index of the quest to be checked
	 */
	getQuestProgressBarClass(): string{
        let totalMinRem: number = this.timeDifference(this.quest_end_date, new Date());
        let hourRem: number = Math.floor(totalMinRem / 1000 / 60 / 60);

		if (hourRem <= 0) {
			return "bg-danger";
		} else if (hourRem <= 24) {
			return "progress-bar-animated bg-danger";
		} else {
			return "progress-bar-animated bg-success";
		}
    }

    setQuestId(_id) {
        this._id = _id;
    }

    setQuestTitle(quest_title) {
        this.quest_title = quest_title;
    }

    setQuestDescription(quest_description) {
        this.quest_description = quest_description;
    }

    setQuestRetakable(quest_retakable) {
        this.quest_retakable = quest_retakable;
    }

    setQuestBadge(quest_badge) {
        this.quest_badge = quest_badge;
    }

    setQuestItem(quest_item) {
        this.quest_item = quest_item;
    }

    setQuestXp(quest_xp) {
        this.quest_xp = quest_xp;
    }

    setQuestHp(quest_hp) {
        this.quest_hp = quest_hp;
    }

    setQuestStarttimedate(quest_start_date) {
        this.quest_start_date = quest_start_date;
    }

    setQuestEndtimedate(quest_end_date) {
        this.quest_end_date = quest_end_date;
    }

    setQuestParty(quest_party) {
        this.quest_party = quest_party;
    }

    setQuestPrerequisite(quest_prerequisite) {
        this.quest_prerequisite = quest_prerequisite;
    }
    
    /**
	 * Returns the difference in minutes of two dates
	 * @param date1 the date of the further date
	 * @param date2 the date of the earlier date
	 * 
	 * @returns the difference (in minutes) of the two dates
	 */
	private timeDifference(date1: Date, date2: Date): number {
		date1 = new Date(date1);
		date2 = new Date(date2);

		let time1 = date1.getTime();
		let time2 = date2.getTime();
		let diffInMs: number = time1 - time2;

		return diffInMs;
    }
    
    /**
	 * Returns the appropriate progress bar label
	 * @description Returns the appropriate progress bar label based on either the total minutes 
	 * remaining or the hours remaining
	 * @param totalMinRem the total minutes remaining for the quest
	 * @param hourRem the hours remaining for the quest
	 * 
	 * @returns string label for the progress bar
	 */
	private getTimeLabel(totalMinRem: number, hourRem: number): string {
		let string = "";
		if (totalMinRem <= 0) {
			string = "Time's up!";
		} else if (hourRem >= 168) {
			let weekRem: number = Math.floor(totalMinRem / 1000 / 60 / 60 / 128);
			let dayRem = Math.floor(totalMinRem / 1000 / 60 / 60 % 128);
			string = weekRem.toString() + " wk(s) & " + dayRem.toString() + " dy(s) left";
		} else if (hourRem >= 24) {
			let dayRem: number = Math.floor(totalMinRem / 1000 / 60 / 60 / 24);
			hourRem = Math.floor(totalMinRem / 1000 / 60 / 60 % 24);
			string = dayRem.toString() + " dy(s) & " + hourRem.toString() + " hr(s) left";
		} else {
			let minRem: number = Math.floor(totalMinRem / 1000 / 60 % 60);
			string = hourRem.toString() + " hr(s) & " + minRem.toString() + " mn(s) left";
		}
		return string;
	}
}