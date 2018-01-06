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
    _id: string;
    course_id: string;
    section_name: string;
    students: Student[];
    instructor: string;
    quests: string[];
    items: string[];
    badges: string[];

    constructor(
        section?: any
    ) {
        if (section) {
            this._id = section.course_id ? section.course_id : "";
            this.course_id = section.course_id ? section.course_id : "";
            this.section_name = section.section_name ? section.section_name : "";
            if (section.students) {
                section.students.array.forEach(student => {
                    let newStudent: Student = new Student(student);
                    this.students.push(newStudent);
                });
            } else {
                this.students = [];
            }
            this.instructor = section.instructor ? section.instructor : "";
            this.quests = section.quests ? section.quests : [];
            this.items = section.items ? section.items : [];
            this.badges = section.badges ? section.badges : [];
        } else {
            this.course_id = "";
            this.section_name = "";
            this.students = [];
            this.instructor = "";
            this.quests = [];
            this.items = [];
            this.badges = [];
        }
    }

    setSection(
        course_id,
        section_name,
        students,
        instructor,
        quests,
        items,
        badges
    ) {
        this.course_id = course_id;
        this.section_name = section_name;
        this.students = students;
        this.instructor = instructor;
        this.quests = quests;
        this.items = items;
        this.badges = badges;
    }

    getSectionId() {
        return this._id;
    }

    getCourseId() {
        return this.course_id;
    }

    getSectionName() {
        return this.section_name;
    }

    getStudents() {
        return this.students;
    }

    getInstructor() {
        return this.instructor;
    }

    getQuests() {
        return this.quests;
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

    getStatus() {
        return this.status;
    }

    setStudentUserId(user_id) {
        this.user_id = user_id;
    }

    setStatus(status) {
        this.status = status;
    }
};

