export class Course {
  course_id: string;
  course_name: string;
  course_description: string;
  sections: string[];
};

export const courses: Course[] = [
  {
    course_id: "11",
    course_name: 'CMSC 128',
    course_description: "Fly hiiiiigh",
    sections: ["11", "22", "33"]
  },
  {
    course_id: "22",
    course_name: 'CMSC 141',
    course_description: "Fly hiiiiigh",
    sections: ["11", "22", "33"]
  },
  {
    course_id: "33",
    course_name: 'CMSC 170',
    course_description: "Fly hiiiiigh",
    sections: ["11", "22", "33"]
  },
  {
    course_id: "44",
    course_name: 'NSM 192',
    course_description: "Fly hiiiiigh",
    sections: ["11", "22", "33"]
  }
];