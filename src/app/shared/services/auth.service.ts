
// Core imports
import {
    Injectable
} from '@angular/core';

import {
    CookieService
} from 'ngx-cookie-service';

@Injectable()
export class AuthService {

    constructor(
        private cookieService: CookieService
    ) { }

    public isAuthenticated(): boolean {
        if (this.cookieService.get('currentUser')){
            return true;
        }
        return false;
    }

}