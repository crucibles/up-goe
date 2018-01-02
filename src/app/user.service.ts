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

import {
  HttpParams
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

@Injectable()
export class UserService {

  private userUrl = 'api/users';  // URL to: server/routes/api.js for users
  private loginUrl = 'api/login'; // URL to: server/routes/api.js for login

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Lets the user log in (if user enters valid email and password) and be able to navigate to the correct pages
   * @param email email input of the user logging in
   * @param password password input of the user logging in
   */
  logIn(email: string, password: string): Observable<User> {

    console.log(email);
    console.log(password);

    const url = this.loginUrl;
    let params = new HttpParams()
      .set('user_email', email)
      .set('user_password', password);
    console.log(params);
    return this.http.get<User>(url, {
      params: params
    }).pipe(
      tap(h => {
        console.log(h);
        const outcome = h ? 'fetched user ' + email : 'did not find user ' + email;
        localStorage.setItem('currentUser', JSON.stringify(h));
        return h;
      }),
      catchError(this.handleError<User>(`logIn user_id=${email}`))
      );
  }

  /*
  login(username: string, password: string) {
          return this.http.post<any>('/api/authenticate', { username: username, password: password })
              .map(user => {
                  // login successful if there's a jwt token in the response
                  if (user && user.token) {
                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('currentUser', JSON.stringify(user));
                  }
  
                  return user;
              });
      }
  */


  /**
   * Logs out the user
   */
  logOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/log-in'])
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
  getUser(id: string): Observable<User> {
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
   * @summary: Edit existing user from server
   */
  editUser(id: string) {
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
