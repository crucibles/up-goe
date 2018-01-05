//Core Imports
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

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
  Quest,
  User
} from 'shared/models';

import { 
  CookieService 
} from 'ngx-cookie-service';


@Injectable()
export class UserService {

  private userUrl = 'api/users';  // URL to: server/routes/api.js for users
  private loginUrl = 'api/login'; // URL to: server/routes/api.js for login

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  /**
   * Lets the user log in (if user enters valid email and password) and be able to navigate to the correct pages
   * @param email email input of the user logging in
   * @param password password input of the user logging in
   */
  logIn(email: string, password: string): Observable<User> {

    const url = this.loginUrl;

    let params = new HttpParams()
      .set('user_email', email)
      .set('user_password', password);

    return this.http.get<User>(url, {
      params: params
    }).pipe(
      tap(data => {
        const outcome = data ? 'fetched user ' + email : 'did not find user ' + email;
        if(data){
        let currentUser = data['user_email']; 
        console.log(currentUser);
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.cookieService.set('currentUser', currentUser);
        }
        return data;
      }),
      catchError(this.handleError<User>(`logIn user_id=${email}`))
      );
  }

  /**
   * Logs out the user
   * add subscribe when have server side
   * and when it is observable
   */
  logOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.cookieService.delete('currentUser');
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
    const url = this.userUrl;
    let params = new HttpParams().set('id', '5a37f4500d1126321c11e5e7');
    return this.http.get<User[]>(url, {
      params: params
    })
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
