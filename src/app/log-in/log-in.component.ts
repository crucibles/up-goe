import {
    Component,
    OnInit
} from '@angular/core';

import {
    FormGroup,
    FormBuilder
} from '@angular/forms';

import {
    UserService
} from 'shared/services';

import {
    Router, ActivatedRoute
} from '@angular/router';

import { 
    AlertService 
} from 'shared/services/alert.service';

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
    public signupForm: FormGroup;
    
    returnUrl: string;

    constructor(
        formBuillder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService
    ) {
        this.signupForm = formBuillder.group({
            email: null,
            password: null
        });
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'general/select-course';
    }

    logIn() {
        let email = this.signupForm.value.email;
        let password = this.signupForm.value.password;

        this.userService.logIn(email, password)
        .subscribe(
            user => {
            if (user) {
                this.router.navigateByUrl(this.returnUrl);
            } else {
                console.log("does not exists!");
            }
        }, error => {
            // login failed so display error
            this.alertService.error(error);
        });
    }

    signup() {
        this.router.navigate(['/sign-up']);
    }
}
