//Core Imports
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

//Application Imports
import {
  Course
} from './course';

import {
  User,
  USER
} from './user';

@Injectable()
export class UserService {

  constructor() { }

  /**
   * @summary: Obtains course from user
   */
  getCourses(): Observable<Course[]>{
    return of(USER.user_course);
  }

  /**
   * @summary: Obtains user from server
   */
  getUser(): Observable<User>{
    return of(USER);
  }

}
