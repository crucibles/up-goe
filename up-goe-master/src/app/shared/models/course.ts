/**
 * A class to represent courses
 * @class
 *
 * @property course_id identification for a course
 * @property course_name name of the course
 * @property course_description description of the course (what the course is all about)
 * @property sections[] array of section names belonging to this course
 */
export class Course {
  private _id: string;
  private course_name: string;
  private course_description: string;

  constructor(
    course?: any
  ) {
    if(course){
      this._id = course._id;
      this.course_name = course.course_name;
      this.course_description = course.course_description;
    } else {
      this.course_name = "";
      this.course_description = "";
    }
  }

  setCourse(
    course_name,
    course_description
  ){
    this.course_name = course_name;
    this.course_description = course_description;
  }

  getCourseId() {
    return this._id;
  }

  getCourseName() {
    return this.course_name;
  }

  getCourseDescription() {
    return this.course_description;
  }

  setCourseId(_id) {
    this._id = _id;
  }

  setCourseName(course_name) {
    this.course_name = course_name;
  }

  setCourseDescription(course_description) {
    this.course_description = course_description;
  }
};
