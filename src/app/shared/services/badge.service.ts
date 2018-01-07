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

  /**
   * Used for accessing/creating/editing/deleting badges
   */
  private badgeUrl = 'api/users';    // URL to: server/routes/api.js for users

  /**
   * 
   */
  private b = "Asd";

  constructor() { }


  /**
   * Adds received new badge to the database
   * @param badge New badge to be added to the database
   */
  createBadge(badge: Badge) {
    const url = this.badgeUrl;

  }


  /**
   * Edits existing badge in the database 
   * @description Edit old information of existing badge of id contained in the badge parameter with the new badge received in the parameter
   * @param badge The badge to be edited from the database
   * - badge.id - id of the badge in order to identify which badge to edit
   */
  editBadge(badge: Badge) {
    const url = this.badgeUrl;
  }

  /**
   * Deletes badge in the database 
   * @param badge_id id of the badge to be deleted from the database
   */
  deleteBadge(badge_id: string) {
    const url = this.badgeUrl;
  }


  /**
   * Adds badge to student
   * @description Adds the badge, either system or section (if section_id variable is available), to the student
   * @param badge Badge to be added to the student
   * @param student_id Id of the student that will be receiving the section-level badge
   * @param section_id (optional) Id of the section where the student will be receiving the badge
   */
  addBadgeToStudent(badge: Badge, student_id: string, section_id?: string) {
    const url = this.badgeUrl;
  }
  
  /**
   * Adds section badge to student
   * @param badge_id id of the badge to be added to the student
   * @param student_id id of the student that will be receiving the section-level badge
   * @param section_id id of the section where the student will be receiving the badge
   */
  addBadgeToSection(badge_id: string, student_id: string, section_id: string) {
    const url = this.badgeUrl;
  }
  
  /**
   * Returns the badge information given the badge id
   * @param badge_id id of the badge whose information is needed to be retrieved
   * 
   * @returns badge information of the chosen badge
   */
  getBadge(badge_id) {
    const url = this.badgeUrl;
  }
  
  /**
   * Gets system-wide badge from database
   * 
   * @returns array of system-wide badges
   */
  getSystemBadges(student_id) {
    const url = this.badgeUrl;
  }
  
  /**
   * Gets section badges from the database
   * @param section_id id of the section whose array of badges are to be retrieved from
   * 
   * @returns array of section-level badges
   */
  getSectionBadges(section_id) {
    const url = this.badgeUrl;
  }
  
}
