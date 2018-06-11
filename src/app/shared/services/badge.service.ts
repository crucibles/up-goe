//Core Imports
import {
    Injectable
} from '@angular/core';

//Application Imports
import {
    Badge,
    Conditions
} from 'shared/models/badge';

import {
    User
} from 'shared/models/user';

import {
    UserService
} from 'shared/services/user.service';

import {
    catchError,
    tap
} from 'rxjs/operators';

import {
    Observable
} from 'rxjs/Observable';

import {
    map
} from 'rxjs/operator/map';

import {
    HttpParams,
    HttpClient
} from '@angular/common/http';

import {
    of
} from 'rxjs/observable/of';

import { SectionService } from 'shared/services/section.service';


const BADGES: any[] = [
    {
        _id: "1",
        badge_name: "Badge Taker",
        badge_photo: "",
        badge_description: "You take a badge!",
        is_system: false,
        badge_attainers: []
    },
    {
        _id: "2",
        badge_name: "Badge Giver",
        badge_photo: "",
        badge_description: "You gave a badge!",
        is_system: false,
        badge_attainers: []
    }
];

@Injectable()
export class BadgeService {

    /**
     * Used for accessing/creating/editing/deleting badges
     */
    private badgeUrl = 'api/badges';    // URL to: server/routes/api.js for users
    private userUrl = 'api/users';
    private uploadBadgeUrl = 'api/upload';

    constructor(
        private userService: UserService,
        private http: HttpClient,
        private sectionService: SectionService
    ) { }

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


    checkIfWillEarnABadge() {
        const url = this.badgeUrl;

        let student = this.userService.getCurrentUser();
        let conditions = student.getUserConditions();

        let body = {
            conditions: conditions,
            user_id: student.getUserId()
        };




        if (student.getUserType() == "student") {

            return this.http.post(url, body).pipe(
                tap(badges => {
                    return badges;
                }),
                catchError(this.handleError<any>(`logIn user_email=${conditions}`))
            );

        }


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
     * Adds received new badge to the database
     * @param badge New badge to be added to the database
     */
    createBadge(badge: Badge, sectionId?: string) {
        const url = this.badgeUrl;
        let body = {
            badgeData: badge,
            sectionId: sectionId
        };

        return this.http.post<any>(url, body).pipe(
            tap(data => {
                if (data) return data
                else return false;
            }),
            catchError(this.handleError<any>(`creating new badge`))
        );
    }

    uploadBadge(badgeFile: any) {
        const url = this.uploadBadgeUrl;
        return this.http.post(url, badgeFile).pipe(
            tap(data => {
                if (data) return data;
                else return false;
            }),
            catchError(this.handleError<any>(`uploading badge image`))
        );
    }

    /**
     * Deletes badge in the database 
     * @param badge_id id of the badge to be deleted from the database
     */
    deleteBadge(badge_id: string) {
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



    getAllbadges(): Observable<any[]> {
        const url = this.badgeUrl;

        let params = new HttpParams()
            .set('method', 'ALL');

        return this.http.get<any[]>(url, {
            params: params
        }).pipe(
            tap(badges => console.log(badges)),
            catchError(this.handleError(`getSectionBadges`, []))
        );
    }

    /**
     * Returns the badge information given the badge id
     * @param badge_id id of the badge whose information is needed to be retrieved
     * 
     * @returns badge information of the chosen badge
     */
    getBadge(badge_id): Observable<any[]> {
        const url = this.badgeUrl;

        let params = new HttpParams()
            .set('badge_id', badge_id);

        return this.http.get<any[]>(url, {
			params: params
		}).pipe(
			tap(badges => console.log(badges)),
			catchError(this.handleError(`getSectionBadges`, []))
		);
    }

    /**
     * Gets section badges from the database
     * @param section_id id of the section whose array of badges are to be retrieved from
     * 
     * @returns array of section-level badges
     */
    getSectionBadges(section_id): Observable<any[]> {
        const url = this.badgeUrl;

        let params = new HttpParams()
            .set('section_id', section_id)
            .set('method', 'getSectionBadges');
            
        return this.http.get<any[]>(url, {
            params: params
        }).pipe(
            tap(badges => console.log(badges)),
            catchError(this.handleError(`getSectionBadges`, []))
        );
    }

    /**
     * Gets system-wide badge from database
     * 
     * @returns array of system-wide badges
     */
    getSystemBadges(student_id) {
        const url = this.badgeUrl;
    }


    getCurrentStudentSystemBadges() {
        const url = this.badgeUrl;

        let params = new HttpParams().set(
            'id', this.userService.getCurrentUser().getUserId()
        )

        return this.http.get<any[]>(url, {
            params: params
        }).pipe(
            tap(data => {
                console.warn(data);
                return data;
            })
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
