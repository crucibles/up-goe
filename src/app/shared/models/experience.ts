
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

    constructor(experience?: any){
        this.experience_id = experience && experience._id? experience._id: "";
        this.user_id = experience && experience.user_id? experience.user_id: "";
        this.section_id = experience && experience.section_id? experience.section_id: "";
        this.quests_taken = experience && experience.quests_taken? experience.quests_taken: [];
    }

    getExperienceId(): string{
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
    getQuestSubmission(quest_id): any{
        let questSubmission: any[] = this.quests_taken.filter( quest => quest.quest_id == quest_id);
        console.log("GETQUEST");
        console.log(quest_id);
        console.log(questSubmission);
        return questSubmission.length > 0 ? questSubmission[0]: null;
    }

    /**
     * Retrieves a student's grade for a particular quest
     * @param quest_id the id of the quest whose user submission is to be retrieved.
     */
    getQuestSubmissionGrade(quest_id): any{
        let questSubmission: any[] = this.quests_taken.filter( quest => quest.quest_id == quest_id);
        return questSubmission.length > 0 && questSubmission[0].quest_grade? questSubmission[0].quest_grade: "";
    }

    /**
     * Retrieves a student's grade for a particular quest
     * @param quest_id the id of the quest whose user submission is to be retrieved.
     */
    getQuestSubmissionDate(quest_id): any{
        let questSubmission: any[] = this.quests_taken.filter( quest => quest.quest_id == quest_id);
        return questSubmission.length > 0 && questSubmission[0].submission_date? questSubmission[0].submission_date: "";
    }

    /**
     * Retrieves a student's grade for a particular quest
     * @param quest_id the id of the quest whose user submission is to be retrieved.
     */
    isStudentQuestGraded(quest_id): any{
        let questSubmission: any[] = this.quests_taken.filter( quest => quest.quest_id == quest_id);
        return questSubmission.length > 0 && questSubmission[0].is_graded? questSubmission[0].is_graded: false;
    }
}