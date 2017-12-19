import {
  Injectable
} from '@angular/core';

import {
  Course
} from './course';

import {
  User,
  USER
} from './user';

import {
  Observable
} from 'rxjs/Observable';

import {
  of
} from 'rxjs/observable/of';

@Injectable()
export class UserService {

  constructor() { }

  getCourses(): Observable<Course[]>{
    return of(USER.u_course);
  }

  getUser(): Observable<User>{
    return of(USER);
  }

}
