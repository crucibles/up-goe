//Core Imports
import {
  HttpClient
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

@Injectable()
export class UserService {

  private userUrl = 'api/users';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Lets the user log in (if user enters valid email and password) and be able to navigate to the correct pages
   * @param email email input of the user logging in
   * @param password password input of the user logging in
   */
  logIn(email: string, password: string): Observable<User>{
    const url = `${this.userUrl}/?user_email=${email}&user_password=${password}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched user ' + email : 'did not find user ' + email;
          console.log(outcome);
        }),
        catchError(this.handleError<User>(`logIn user_id=${email}`))
      );
  }

  /**
   * Logs out the user
   */
  logOut() {

  }

  /**
   * Registers the received user parameter to the database 
   * @param user user to be registered to the database
   */
  register(user: User) {

  }

  /**
   * @summary: Obtains user from server
   */
  getUserById(id: string): Observable<User> {
    const url = `${this.userUrl}/?user_id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched user ' + id : 'did not find user ' + id;
          console.log(outcome);
        }),
        catchError(this.handleError<User>(`getUserById user_id=${id}`))
      );
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
