export class Course {
  c_id: number;
  c_name: string;
  c_code: string;
  instructor: string;
};

export const COURSES: Course[] = [
  { c_id: 11, c_name: 'CMSC 128', c_code: '123', instructor: 'Miguel Guillermo'},
  { c_id: 12, c_name: 'NSM 192', c_code: '101', instructor: 'Vicente Calag' }
];

export const ALLCOURSES: Course[] = [
  { c_id: 11, c_name: 'CMSC 128', c_code: '123', instructor: 'Miguel Guillermo'},
  { c_id: 11, c_name: 'CMSC 141', c_code: '456', instructor: 'Jon Santillan'},
  { c_id: 11, c_name: 'CMSC 170', c_code: '789', instructor: 'Ritchie Gamot'},
  { c_id: 12, c_name: 'NSM 192', c_code: '101', instructor: 'Vicente Calag' }
];