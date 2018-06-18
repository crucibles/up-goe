/**
 * A class to represent sections
 * @class
 * 
 * @property section_id identification for a section
 * @property course_id id of the course the section belongs to 
 * @property section_name the section's name
 * @property students students of the section; both approved and pending approval
 * @property section_schedule schedule of the section
 * @property instructor the section's instructor
 */
export class Section {
    private _id: string;
    private course_id: string;
    private section_name: string;
    private students: Student[];
    private instructor: string;
    private quests: SectionQuest[];
    private items: string[];
    private badges: string[];
    private schedule: any[];

    constructor(
        section?: any
    ) {
        if (section) {
            this._id = section._id ? section._id : "";
            this.course_id = section.course_id ? section.course_id : "";
            this.section_name = section.section_name ? section.section_name : "";
            this.students = [];
            this.students = section.students? section.students.map(student => new Student(student)) : [];
            this.instructor = section.instructor ? section.instructor : "";
            this.quests = section.quests ? section.quests.map(quest => new SectionQuest(quest)) : [];
            this.items = section.items ? section.items : [];
            this.badges = section.badges ? section.badges : [];
            this.schedule = section.schedule? section.schedule: [];
        } else {
            this.course_id = "";
            this.section_name = "";
            this.students = [];
            this.instructor = "";
            this.quests = [];
            this.items = [];
            this.badges = [];
            this.schedule = [];
        }
    }

    setSection(
        course_id,
        section_name,
        students,
        instructor,
        quests,
        items,
        badges,
        schedule
    ) {
        this.course_id = course_id;
        this.section_name = section_name;
        this.students = students;
        this.instructor = instructor;
        this.quests = quests;
        this.items = items;
        this.badges = badges;
        this.schedule = schedule;
    }

    getSectionId() {
        return this._id;
    }

    getSchedule() {
        return this.schedule;
    }

    getCourseId() {
        return this.course_id;
    }

    getSectionName() {
        return this.section_name;
    }
    
    /**
     * Returns student based on id; returns null if not found
     * @param user_id 
     */
    searchStudent(user_id: string): Student{
        let student = this.students.filter( student =>
            student.getStudentUserId() == user_id
        )[0];
        return student;
    }

    /**
     * Returns a student's status
     * @param userId id of the user whose status is to be retrieved
     * @param showFullWord (optional) Shows full word instead of single character; default is false
     * - True if full word ("Enrolled" or "Requesting")
     * - False if single character only
     * 
     */
    getStudentStatus(userId: string, showFullWord?: boolean){
        let studentStatus = this.searchStudent(userId).getStatus();
        if(showFullWord){
            studentStatus = studentStatus == "E"? "Enrolled": "Requesting";
        }
        return studentStatus;
    }

    getStudents() {
        return this.students;
    }

    getInstructor() {
        return this.instructor;
    }

    getQuests() {
        return this.quests || this.quests == undefined? this.quests: [];
    }

    getItems() {
        return this.items;
    }

    getBadges() {
        return this.badges;
    }

    setSectionId(_id) {
        this._id = _id;
    }

    setCourseId(course_id) {
        this.course_id = course_id;
    }

    setSectionName(section_name) {
        this.section_name = section_name;
    }

    setStudents(students) {
        this.students = students;
    }

    setInstructor(instructor) {
        this.instructor = instructor;
    }

    setQuests(quests) {
        this.quests = quests;
    }

    setItems(items) {
        this.items = items;
    }

    setBadges(badges) {
        this.badges = badges;
    }

    /**
     * Identifies whether a student is a participant of a quest or not. Returns true if student is a participant of the quest; false if otherwise
     * @param user_id Id of the student whose participation is needed to be confirmed
     * @param quest_id Id of the quest whose participants are needed to be seen
     */
    isQuestParticipant(user_id: string, quest_id: string): boolean{
        //obtains the quest of the clicked quest by filtering the quests of the current section
		let sectionQuest: SectionQuest = this.quests.filter(quest => quest.getSectionQuestId() == quest_id)[0];

		//obtains the participants and locates the current user by filtering participants of the section quest
		//returns true if found; false otherwise
        let isParticipant = sectionQuest? sectionQuest.searchParticipant(user_id): null;
        if(isParticipant){
            return true;
        } else {
            return false;
        }
    }

    /**
     * Sets the student's current status
     * @param user_id id of the student whose status is to be changed
     * @param newStatus new status of the chosen student
     */
    setStudentStatus(user_id, newStatus){
        this.students = this.students.map(student => {
            if(student.getStudentUserId() == user_id){
                student.setStatus(newStatus);
            } 
            return student;
        });
    }
    
}



/**
 * A class to represent students
 * @class
 * 
 * @property user_id identification for a student
 * @property status student's status if approved or not;
 * "E" if student is enrolled and "R" if student is still waiting for approval
 */
export class Student {
    user_id: string;
    status: string;

    constructor(
        student
    ) {
        if(student){
            this.user_id = student.user_id? student.user_id: "";
            this.status = student.status? student.status: "";
        } else {
            this.user_id = "";
            this.status = "";
        }
    }

    setStudent(
        user_id,
        status
    ) {
        this.user_id = user_id;
        this.status = status;
    }

    getStudentUserId() {
        return this.user_id;
    }

    /**
     * Returns a student's status
     * @param showFullWord (optional) Shows full word instead of single character; default is false
     * - True if full word ("Enrolled" or "Requesting")
     * - False if single character only
     */
    getStatus(showFullWord?: boolean) {
        let studentStatus: string = this.status;
        if(showFullWord){
            studentStatus = studentStatus == "E"? "Enrolled": "Requesting";
        }
        
        return studentStatus;
    }

    setStudentUserId(user_id) {
        this.user_id = user_id;
    }

    setStatus(status) {
        this.status = status;
    }
};

export class SectionQuest {
    private quest_id: string;
    private quest_participants: string[];
    private quest_prerequisite: string[];

    constructor(
        sectionQuest?: any
    ) {
        if(sectionQuest){
            this.quest_id = sectionQuest.quest_id ? sectionQuest.quest_id: "";
            this.quest_participants = sectionQuest.quest_participants ? sectionQuest.quest_participants: [];
            this.quest_prerequisite = sectionQuest.quest_prerequisite ? sectionQuest.quest_prerequisite: [];
        } else {
            this.quest_id = "";
            this.quest_participants = [];
            this.quest_prerequisite = [];
        }
    }

    setSectionQuest(
        quest_id,
        quest_participants,
        quest_prerequisite
    ){
        this.quest_id = quest_id;
        this.quest_participants = quest_participants;
        this.quest_prerequisite = quest_prerequisite;
    }

    getSectionQuestId(){
        return this.quest_id;
    }

    getQuestParticipants(){
        return this.quest_participants;
    }

    getQuestPrerequisite(){
        return this.quest_prerequisite;
    }

    setSectionQuestId(quest_id){
        this.quest_id = quest_id;
    }

    setQuestParticipants(quest_participants){
        this.quest_participants = quest_participants;
    }

    setQuestPrerequisite(quest_prerequisite){
        this.quest_prerequisite = quest_prerequisite;
    }

    /**
     * Identifies whether a student is a participant of a quest or not. Returns true if student is a participant of the quest; false if otherwise
     * @param user_id Id of the student whose participation is needed to be confirmed
     */
    searchParticipant(user_id: string): string{
        let participant = this.quest_participants.filter(id => user_id == id)[0];
        return participant;
    }
}