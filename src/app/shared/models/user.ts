/**
 * A class to represent users
 * @class
 * @classdesc A class to represent users
 * 
 * @member user_fname user's first name 
 * @member user_mname user's middle name 
 * @member user_lname user's last name 
 * @member user_birthdate user's birthdate 
 * @member user_email user's email (for log purpose)
 * @member user_password user's password 
 * @member user_type identifies if user is a teacher or a student; 
 * "S" if student and "P" if professor
 * @member {user_contact_no} user's contact #
 * @member user_security_question user's chosen security question
 * @member user_security_answer user's answer to the chosen security question
 */
export class User {
  _id: string;
  user_fname: string;
  user_mname: string;
  user_lname: string;
  user_birthdate: Date;
  user_email: string;
  user_password: string;
  user_type: string;
  user_contact_no: string;
  user_photo: string;
  user_school_id: string;
  user_security_question: string;
  user_security_answer: string;
};

export const TOTXP: number[] = [1000,2123,3439,4655,6053,6104];

export const MAXXP: number = 10000;