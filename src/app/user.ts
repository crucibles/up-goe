/**
 * A class to represent users
 * @class
 * 
 * @property user_id identification for a user
 * @property user_fname user's first name 
 * @property user_mname user's middle name 
 * @property user_lname user's last name 
 * @property user_birthdate user's birthdate 
 * @property user_email user's email (for log purpose)
 * @property user_password user's password 
 * @property user_type identifies if user is a teacher or a student; 
 * "S" if student and "P" if professor
 * @property user_contact_no user's contact #
 * @property user_security_question user's chosen security question
 * @property user_security_answer user's answer to the chosen security question
 */
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
};

export const TOTXP: number[] = [1000,2123,3439,4655,6053,6104];

export const MAXXP: number = 10000;