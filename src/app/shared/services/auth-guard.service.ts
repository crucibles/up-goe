// Core Imports
import {
    Injectable
} from '@angular/core';

import {
    Router, CanActivate, Route, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

// Application Imports
import {
    AuthService
} from './auth.service';

import { 
    CanLoad 
} from '@angular/router/src/interfaces';

import { 
    Observable 
} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
    

    constructor(
        public auth: AuthService, 
        public router: Router
    ) { }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        console.log(route);
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(route.routeConfig.path);
        if(this.auth.isAuthenticated() && route.routeConfig.path=="log-in" || route.routeConfig.path=="sign-up"){
            console.warn("You are already logged in.");
            this.router.navigate(['/general/select-course']);
            return false;
        } else if(!this.auth.isAuthenticated() && route.routeConfig.path!="log-in" && route.routeConfig.path!="sign-up") {
            console.warn("You are not logged in.");
            this.router.navigate(['/log-in']);
            return false;
        } else if(!this.auth.isAuthenticated() && route.routeConfig.path=="log-in"){
            return true;
        } else {
            return true;
        }
    }

}