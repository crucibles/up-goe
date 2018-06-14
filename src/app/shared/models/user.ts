import { Conditions, Badge } from "shared/models/badge";

export const imageDir: string = "/assets/images/";
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
  private user_conditions: Conditions;

  constructor(
    user?: any
  ) {
    if (user) {
      this._id = user._id;
      this.user_fname = user.user_fname ? user.user_fname : "";
      this.user_mname = user.user_mname ? user.user_mname : "";
      this.user_lname = user.user_lname ? user.user_lname : "";
      this.user_birthdate = user.user_birthdate ? new Date(user.user_birthdate) : new Date();
      this.user_email = user.user_email ? user.user_email : "";
      this.user_password = user.user_password ? user.user_password : "";
      this.user_type = user.user_type ? user.user_type : "";
      this.user_contact_no = user.user_contact_no ? user.user_contact_no : "";
      this.user_photo = user.user_photo ? user.user_photo : "";
      this.user_school_id = user.user_school_id ? user.user_school_id : "";
      this.user_security_question = user.user_security_question ? user.user_security_question : "";
      this.user_security_answer = user.user_security_answer ? user.user_security_answer : "";
      this.user_conditions = new Conditions(user.user_conditions);
    } else {
      this.user_fname = "";
      this.user_mname = "";
      this.user_lname = "";
      this.user_birthdate = new Date();
      this.user_email = "";
      this.user_password = "";
      this.user_type = "";
      this.user_contact_no = "";
      this.user_photo = "";
      this.user_school_id = "";
      this.user_security_question = "";
      this.user_security_answer = "";
      this.user_conditions = new Conditions();
    }
  }

  setUser(
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
    user_security_answer,
    user_conditions
  ) {
    this.user_fname = user_fname;
    this.user_mname = user_mname;
    this.user_lname = user_lname;
    this.user_birthdate = new Date(user_birthdate);
    this.user_email = user_email;
    this.user_password = user_password;
    this.user_type = user_type;
    this.user_contact_no = user_contact_no;
    this.user_photo = user_photo;
    this.user_school_id = user_school_id;
    this.user_security_question = user_security_question;
    this.user_security_answer = user_security_answer;
    this.user_conditions = new Conditions(user_conditions);
  }

  getUserId() {
    return this._id;
  }

  getUserFirstName() {
    return this.user_fname;
  }

  getUserMiddleName() {
    return this.user_mname;
  }

  getUserLastName() {
    return this.user_lname;
  }

  getUserFullName() {
    let firstName: string = this.user_fname;
    let middleName: string = this.user_mname && this.user_mname.length != 0 ? this.user_mname[0] + "." : "";
    let lastName: string = this.user_lname;
    let fullName: string = firstName + " " + middleName + " " + lastName;

    return fullName;
  }

  /**
   * Returns the user's birthdate
   */
  getUserBirthdate() {
    return this.user_birthdate;
  }

  /**
   * Returns the user's formatted birthdate
   * @param isFormatted (eoptional) returns a formatted datestring; default value is false
   * - True if formatted
   * - False if not formatted or in 'Date' form
   */
  getUserFormattedBirthdate() {
    let birthdate = this.formatDate(this.user_birthdate);
    return birthdate;
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
    let image: string = "";

    // if image does not exist or if user has not set an image
    if (!this.user_photo || this.user_photo.length == 0) {
      image = imageDir + "avatar.png";
    } else {
      image = imageDir + this.user_photo;
    }

    return image;
  }

  getUserSchoolId() {
    return this.user_school_id ? this.user_school_id : "";
  }

  getUserSecurityQuestion() {
    return this.user_security_question;
  }

  getUserSecurityAnswer() {
    return this.user_security_answer;
  }

  getUserConditions() {
    return this.user_conditions;
  }

  isLoggedInToday(): boolean{
    let date = this.user_conditions.getLogInTotal().filter(date => new Date(date).getDate() == new Date(Date.now()).getDate());
    return date && date.length > 0;
  }

  setLoggedInToday(){
    this.user_conditions.addToLoggedInTotal();
  }

  setUserConditions(user_conditions) {
    this.user_conditions = user_conditions;
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

  /**
	* Returns the appropriate datestring given a date object
	* @param date_obj date to be formatted
	* 
	* @returns string of the formatted date
	*/
	private formatDate(date_obj) {
		let months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		let month = months[date_obj.getMonth()];
		let day = date_obj.getDate();
		let year = date_obj.getFullYear();

		let datestring: string = month + " " + day + ", " + year;
		return datestring;
	}

};

export const TOTXP: number[] = [1000, 2123, 3439, 4655, 6053, 6104];

export const MAXXP: number = 10000;