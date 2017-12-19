import {
    Course,
    COURSES
} from './course'

export class User {
  u_id: number;
  u_f_name: string;
  u_m_name: string;
  u_l_name: string;
  u_birthdate: Date;
  u_email: string;
  u_password: string;
  u_type: string;
  u_contact_no: string;
  u_security_question: string;
  u_security_answer: string;
  u_course: Course[];
};

export const USER: User = {
  u_id: 1,
  u_f_name: 'Donevir',
  u_m_name: 'Densing',
  u_l_name: 'Hynson',
  u_birthdate: new Date('1997/05/26'),
  u_email: 'ddhynson@up.edu.ph',
  u_password: 'p',
  u_type: 'student',
  u_contact_no: '09499709292',
  u_security_question: 'What is your name?',
  u_security_answer: 'Donevir',
  u_course: COURSES
};

export const TOTXP: number[] = [1000,2123,3439,4655,6053,6104];

export const MAXXP: number = 10000;

