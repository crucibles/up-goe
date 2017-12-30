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
    section_id: string;
    course_id: string;
    section_name: string;
    students: Student[];
    instructor: string;
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

    constructor(u_id, stat){
        this.user_id = u_id;
        this.status = stat;
    }
};

