
/**
 * A class to represent student EXP
 * @class
 *
 * @property experience_id identification for a badge
 * @property badge_photo photoname for the badge
 * @property badge_description description what the badge is all about
 * @property badge_conditions conditions needed to accomplish in order to obtain this badge
 */
export class Experience {
    private experience_id: string;
    private user_id: string;
    private section_id: string;
    private quests_taken: any[];

    constructor(experience?: any) {
        this.experience_id = experience && experience._id ? experience._id : "";
        this.user_id = experience && experience.user_id ? experience.user_id : "";
        this.section_id = experience && experience.section_id ? experience.section_id : "";
        this.quests_taken = experience && experience.quests_taken ? experience.quests_taken : [];
    }

    getExperienceId(): string {
        return this.experience_id;
    }

    getUserId(): string {
        return this.user_id;
    }

    getSectionId(): string {
        return this.section_id;
    }

    getQuestsTaken(): any[] {
        return this.quests_taken;
    }

    /**
     * Retrieves a student's quest submission 
     * @param quest_id the id of the quest whose user submission is to be retrieved.
     */
    getQuestSubmission(quest_id): any {
        let questSubmission: any[] = this.quests_taken.filter(quest => quest.quest_id == quest_id);
        // console.log("GETQUEST");
        // console.log(quest_id);
        // console.log(questSubmission);
        return questSubmission.length > 0 ? questSubmission[0] : null;
    }

    /**
     * Retrieves a student's grade for a particular quest
     * @param quest_id the id of the quest whose user submission is to be retrieved.
     */
    getQuestSubmissionGrade(quest_id): any {
        let questSubmission: any[] = this.quests_taken.filter(quest => quest.quest_id == quest_id);
        return questSubmission.length > 0 && questSubmission[0].quest_grade ? questSubmission[0].quest_grade : "";
    }

    /**
     * Retrieves a student's grade for a particular quest
     * @param quest_id the id of the quest whose user submission is to be retrieved.
     */
    getQuestSubmissionDate(quest_id): any {
        let questSubmission: any[] = this.quests_taken.filter(quest => quest.quest_id == quest_id);
    
        return questSubmission.length > 0 && questSubmission[0].date_submitted ? questSubmission[0].date_submitted : "";
    }

    /**
     * Retrieves a student's grade for a particular quest
     * @param quest_id the id of the quest whose user submission is to be retrieved.
     */
    getQuestSubmissionComment(quest_id): any {
        let questSubmission: any[] = this.quests_taken.filter(quest => quest.quest_id == quest_id);
  
        return questSubmission.length > 0 && questSubmission[0].comment ? questSubmission[0].comment : "";
    }

    /**
     * Retrieves a student's grade for a particular quest
     * @param quest_id the id of the quest whose user submission is to be retrieved.
     */
    isStudentQuestGraded(quest_id): any {
        let questSubmission: any[] = this.quests_taken.filter(quest => quest.quest_id == quest_id);
        return questSubmission.length > 0 && questSubmission[0].is_graded ? questSubmission[0].is_graded : false;
    }

    setIsGraded(quest_id) {
        this.quests_taken = this.quests_taken.map(quest => {
            if(quest.quest_id == quest_id) {
                quest.is_graded = true;
            }
            return quest;
        });
    }

    getWeeklyAccumulativeGrades(): number[] {
        console.log("--getWeeklyAccumulativeGrades--");
        let weekGrade: any[] = this.groupByWeek();
        let totalWeekGrades: any[] = [];
        let latestWeek = 0;
        weekGrade.forEach(questGrade => {
            latestWeek = latestWeek < questGrade.week? questGrade.week: latestWeek;
            if(totalWeekGrades.length == 0 || totalWeekGrades.filter(weekGrade => weekGrade.week == questGrade.week).length == 0){
                let weekGrade = {
                    week: questGrade.week,
                    grades: questGrade.grade
                }
                console.log("weekGrade");
                console.log(weekGrade);
                totalWeekGrades.push(weekGrade);
            } else {
                let i = totalWeekGrades.findIndex(weekGrade => weekGrade.week == questGrade.week);
                totalWeekGrades[i].grades += questGrade.grade;
                console.log("updatedweekGrade");
                console.log(totalWeekGrades[i]);
            }
        });
        console.log("totalWeekGrades");
        console.log(totalWeekGrades);
        console.log("latestWeek");
        console.log(latestWeek);
        let accumulativeWeekGrades: any[] = this.getAccumulativeGrades(totalWeekGrades, latestWeek);
        console.log("FINALWEEK");
        console.log(totalWeekGrades);
        return accumulativeWeekGrades;
    }

    private getAccumulativeGrades(weeklyGrades: any[], latestWeek: number): number[]{
        let accumulativeGrades: number[] = [];
        accumulativeGrades.push(0);
        for(let i = 1; i <= latestWeek; i++){
            let index = weeklyGrades.findIndex(weekGrade => i == weekGrade.week);
            let weekGrade = index < 0? 0: weeklyGrades[index].grades;
            accumulativeGrades.push(accumulativeGrades[i - 1] + weekGrade);
            console.log(accumulativeGrades[i - 1] + " + " + weekGrade + " = ");
            console.log(accumulativeGrades);
        }
        return accumulativeGrades;
    }

    private groupByWeek() {
        let week: any[] = [];
        let smallestIndex = -1;
        console.log("<groupbyweekfunc");
        console.log(this.quests_taken);
        this.quests_taken = this.quests_taken.filter(quest => quest.date_submitted != "");
        this.quests_taken.forEach(quest => {
            let date = new Date(quest.date_submitted);
            let index = Math.floor(date.getTime()) / (1000 * 60 * 60 * 24 * 7);
            index = Math.floor(index);
            if(smallestIndex < 0 || smallestIndex > index){
                smallestIndex = index;
            }
            week.push({
                week: index,
                grade: Number.parseFloat(quest.quest_grade)
            })
        });
        smallestIndex--; 
        console.log("smallestIndex");
        console.log(smallestIndex);
        
        console.log("oldweek");
        console.log(week);
        week = week.map(week => {
            let newWeek = week.week - smallestIndex;
            return {
                week: newWeek,
                grade: week.grade
            }
        });
        
        console.log("newweek");
        console.log(week);
        console.log(">groupbyweekfuncend");
        return week;
    }
}