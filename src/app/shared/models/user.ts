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
 * @member user_contact_no user's contact #
 * @member user_security_question user's chosen security question
 * @member user_security_answer user's answer to the chosen security question
 */
export class User {
  private _id: string;
  private user_fname: string;
  private user_mname: string;
  private user_lname: string;
  private user_birthdate: Date;
  private user_email: string;
  private user_password: string;
  private user_type: string;
  private user_contact_no: string;
  private user_photo: string;
  private user_school_id: string;
  private user_security_question: string;
  private user_security_answer: string;

  constructor(
    user_fname,
    user_mname,
    user_lname,
    user_birthdate,
    user_email,
    user_password,
    user_type,
    user_contact_no,
    user_photo,
    user_school_id,
    user_security_question,
    user_security_answer
  ) {
    this.user_fname = user_fname;
    this.user_mname = user_mname;
    this.user_lname = user_lname;
    this.user_birthdate = user_birthdate;
    this.user_email = user_email;
    this.user_password = user_password;
    this.user_type = user_type;
    this.user_contact_no = user_contact_no;
    this.user_photo = user_photo;
    this.user_school_id = user_school_id;
    this.user_security_question = user_security_question;
    this.user_security_answer = user_security_answer;
  }
  
  getUserId() {
    return this._id;
  }

  getUserFname() {
    return this.user_fname;
  }

  getUserMname() {
    return this.user_mname;
  }

  getUserLname() {
    return this.user_lname;
  }

  getUserBirthdate() {
    return this.user_birthdate;
  }

  getUserEmail() {
    return this.user_email;
  }

  getUserPassword() {
    return this.user_password;
  }

  getUserType() {
    return this.user_type;
  }

  getUserContactNo() {
    return this.user_contact_no;
  }

  getUserPhoto() {
    return this.user_photo;
  }

  getUserSchoolId() {
    return this.user_school_id;
  }

  getUserSecurityQuestion() {
    return this.user_security_question;
  }

  getUserSecurityAnswer() {
    return this.user_security_answer;
  }

  setUserId(_id) {
    this._id = _id;
  }

  setUserFname(user_fname) {
    this.user_fname = user_fname;
  }

  setUserMname(user_mname) {
    this.user_mname = user_mname;
  }

  setUserLname(user_lname) {
    this.user_lname = user_lname;
  }

  setUserBirthdate(user_birthdate) {
    this.user_birthdate = user_birthdate;
  }

  setUserEmail(user_email) {
    this.user_email = user_email;
  }

  setUserPassword(user_password) {
    this.user_password = user_password;
  }

  setUserType(user_type) {
    this.user_type = user_type;
  }

  setUserContactno(user_contact_no) {
    this.user_contact_no = user_contact_no;
  }

  setUserPhoto(user_photo) {
    this.user_photo = user_photo;
  }

  setUserSchoolid(user_school_id) {
    this.user_school_id = user_school_id;
  }

  setUserSecurityquestion(user_security_question) {
    this.user_security_question = user_security_question;
  }

  setUserSecurityanswer(user_security_answer) {
    this.user_security_answer = user_security_answer;
  }
};

export const TOTXP: number[] = [1000, 2123, 3439, 4655, 6053, 6104];

export const MAXXP: number = 10000;