import {
    Course
} from './course'

import {
  Quest
} from './quest'

export class User {
  user_id: string;
  user_fname: string;
  user_mname: string;
  user_lname: string;
  user_birthdate: Date;
  user_email: string;
  user_password: string;
  user_type: string;
  user_contact_no: string;
  user_security_question: string;
  user_security_answer: string;
  user_course: string[];
  user_quests: string[];
};

export const TOTXP: number[] = [1000,2123,3439,4655,6053,6104];

export const MAXXP: number = 10000;


export const users: User[] = [
  {
    user_id: '1',
    user_fname: 'Donevir',
    user_mname: 'Densing',
    user_lname: 'Hynson',
    user_birthdate: new Date('1997/05/26'),
    user_email: 'ddhynson@up.edu.ph',
    user_password: 'p',
    user_type: 'student',
    user_contact_no: '09499709292',
    user_security_question: 'What is your name?',
    user_security_answer: 'Donevir',
    user_course: ["11", "22"],
    user_quests: ["22", "33"]
  },
  {
    user_id: '2',
    user_fname: 'Cedric',
    user_mname: 'Yao',
    user_lname: 'Alvaro',
    user_birthdate: new Date('1997/08/02'),
    user_email: 'cyalvaron@up.edu.ph',
    user_password: 'c',
    user_type: 'student',
    user_contact_no: '09499709292',
    user_security_question: 'What is your name?',
    user_security_answer: 'Cedric',
    user_course: ["11", "22"],
    user_quests: ["22", "33"]
  }
];
