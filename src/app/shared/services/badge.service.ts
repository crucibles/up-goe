//Core Imports
import {
  Injectable
} from '@angular/core';

//Application Imports
import {
  Badge
} from 'shared/models';

@Injectable()
export class BadgeService {

  constructor() { }


  /**
   * Adds received new badge to the database
   * @param badge - new badge to be added to the database
   */
  createBadge(badge: Badge) {

  }


  /**
   * Edits existing badge in the database 
   * @description Edit old information of existing badge of id contained in the badge parameter with the new badge received in the parameter
   * @param badge - the badge to be edited from the database; also contains id to identify which badge to edit
   */
  editBadge(badge: Badge) {

  }

  /**
   * Deletes badge in the database 
   * @param badge_id id of the badge to be deleted from the database
   */
  deleteBadge(badge_id: string) {

  }

  /**
   * Adds system-wide badge to student
   * @param badge_id id of the badge to be added to the student
   * @param student_id id of the student that will be receiving the system-wide badge
   */
  addSystemBadge(badge_id, student_id) {
  }

  /**
   * Adds section badge to student
   * @param badge_id id of the badge to be added to the student
   * @param student_id id of the student that will be receiving the section-level badge
   * @param section_id id of the section where the student will be receiving the badge
   */
  addSectionBadge(badge_id, student_id, section_id) {
  }

  /**
   * Returns the badge information given the badge id
   * @param badge_id id of the badge whose information is needed to be retrieved
   * 
   * @returns badge information of the chosen badge
   */
  getBadgeById(badge_id) {

  }

  /**
   * Gets system-wide badge of a student from database
   * @param student_id id of the student whose badges are needed to be retrieved
   * 
   * @returns array of student's system-wide badges
   */
  getSystemBadges(student_id) {

  }

  /**
   * Gets section badges of a student from the database
   * @param section_id id of the section in which the student needing the array of badges 
   * @param student_id id of the student whose section badges are needed to be retrieved
   * 
   * @returns array of student's section-level badges
   */
  getSectionBadges(section_id, student_id) {

  }

}
