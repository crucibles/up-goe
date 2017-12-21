export class Course {
  course_id: number;
  course_name: string;
  course_code: string;
  instructor: string;
};

export const COURSES: Course[] = [
  { course_id: 11, course_name: 'CMSC 128', course_code: '123', instructor: 'Miguel Guillermo'},
  { course_id: 12, course_name: 'NSM 192', course_code: '101', instructor: 'Vicente Calag' }
];

export const ALLCOURSES: Course[] = [
  { course_id: 11, course_name: 'CMSC 128', course_code: '123', instructor: 'Miguel Guillermo'},
  { course_id: 11, course_name: 'CMSC 141', course_code: '456', instructor: 'Jon Santillan'},
  { course_id: 11, course_name: 'CMSC 170', course_code: '789', instructor: 'Ritchie Gamot'},
  { course_id: 12, course_name: 'NSM 192', course_code: '101', instructor: 'Vicente Calag' }
];