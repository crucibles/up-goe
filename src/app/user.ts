import {
    Course,
    COURSES
} from './course'

export class User {
  user_id: number;
  user_f_name: string;
  user_m_name: string;
  user_l_name: string;
  user_birthdate: Date;
  user_email: string;
  user_password: string;
  user_type: string;
  user_contact_no: string;
  user_security_question: string;
  user_security_answer: string;
  user_course: Course[];
};

/*Mock user*/
export const USER: User = {
  user_id: 1,
  user_f_name: 'Donevir',
  user_m_name: 'Densing',
  user_l_name: 'Hynson',
  user_birthdate: new Date('1997/05/26'),
  user_email: 'ddhynson@up.edu.ph',
  user_password: 'p',
  user_type: 'student',
  user_contact_no: '09499709292',
  user_security_question: 'What is your name?',
  user_security_answer: 'Donevir',
  user_course: COURSES
};

export const TOTXP: number[] = [1000,2123,3439,4655,6053,6104];

export const MAXXP: number = 10000;

