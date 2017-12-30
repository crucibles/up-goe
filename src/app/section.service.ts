//Core Imports
import {
  HttpClient, HttpParams
} from '@angular/common/http';

import {
  Injectable
} from '@angular/core';

//Third-Party Imports
import {
  Observable
} from 'rxjs/Observable';

import {
  of
} from 'rxjs/observable/of';

import {
  catchError,
  map,
  tap
} from 'rxjs/operators';

//Application Imports
import {
  Course,
  courses
} from './course';

import {
  User
} from './user';

import {
  Quest
} from './quest'
import { Section } from './section';
import { RequestOptions } from '@angular/http';

@Injectable()
export class SectionService {

  private secUrl = "api/sections"

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Adds received newly created course to the database
   * @param course - new course to be added to the database
   */
  createCourse(course) {

  }

  /**
   * Adds received newly created section to the database
   * @param course - new section to be added to the database
   */
  createSection(section) {

  }


  /**
   * Adds students to the section's list of pending approval
   * @param user_id id of the user to be added to the section's list of pending approval
   * @param section_id id of the section where the user will be added
   */
  sendApprovalToSection(user_id, section_id) {

  }

  /**
   * Approves the student entry to the section 
   * @param user_id id of the user whose entry is to be approved
   * @param section_id id of the section where the entry is granted
   */
  approveUserToSection(user_id, section_id) {

  }

  /**
   * Removes/reject the student from the section
   * @param user_id id of the user to be rejected/removed
   * @param section_id id of the section where the student is to be removed/rejected
   */
  removeUserToSection(user_id, section_id) {

  }

  /**
   * Edits existing section in the database 
   * @description Edit old information of existing section of id contained in the section parameter
   * with the new section received in the parameter
   * @param badge the badge to be edited from the database; also contains id to identify which badge to edit
   */
  editSection(section) {

  }

  /**
   * Deletes section from the database
   * @param section_id id of section to be deleted
   */
  deleteSection(section_id) {

  }

  /**
   * Ends the section by finalizing and exporting the grades, removing all the students in the section
   * while retaining the section name, description, etc.
   * @param section old section information; also contains id to identify which section to edit
   */
  endSection(section) {
    // murag graduation ang peg... di ko sure... feeling nko murag syag create section pro wipe out lng ang other information
  }

  /**
   * Returns the array of sections based on user id
   * @param user_id id of the user whose array of sections are to be retrieved
   * 
   * @returns array of sections
   */
  getUserSections(user_id): Observable<Section[]> {
    const url = `${this.secUrl}`;
    let params = new HttpParams().set('section', '11');
    return this.http.get<Section[]>(url, { params }).pipe(
      tap(h => {
        const outcome = h ?
          'fetched sections of user ' + user_id : 'did not find sections of user ' + user_id;
      }),
      catchError(this.handleError<Section[]>(`getUserSections user_id=${user_id}`))
    );
  }

  /**
   * Returns the course information based by the section id
   * @param section_id id of the section whose course information are to be retrieved
   * 
   * @returns course information of the section
   */
  getCourseBySection(section_id) {
    // useful to know which course the section belongs to which will be useful in the select-course table
  }

  /**
   * Returns students of the section based on section id
   * @param section_id id of the section whose array of students are to be retrieved
   */
  getSectionStudents(section_id) {

  }

  /**
   * Returns user's section grades(or xp)
   * @param user_id id of the user whose experience points are to be retrieved
   * @param section_id id of the section where the student belongs to
   */
  getUserSectionExp(user_id, section_id) {

  }

  /**
   * Search section by either its class name or code
   * @param string string that contains the typed class name or code
   */
  searchSection(string) {

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
