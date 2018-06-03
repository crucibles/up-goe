// Core imports
import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import {
    Router, ActivatedRoute
} from '@angular/router';

// 3rd Party imports
import {
    AlertService
} from 'shared/services/alert.service';

import {
    ToastsManager
} from 'ng2-toastr';

import {
    User
} from 'shared/models';

// Application imports
import {
    BadgeModal
} from 'shared/pages/badge-modal/badge-modal';

import {
    UserService
} from 'shared/services';

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
    @ViewChild('badgeModal') badgeModal: BadgeModal;

    public signupForm: FormGroup;

    returnUrl: string;
    private loginForm: FormGroup;
    private warning: boolean;

    constructor(
        formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private toastr: ToastsManager
    ) {
        this.loginForm = formBuilder.group({
            email: [null, Validators.email],
            password: null
        });

    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        this.warning = false;
    }

    logIn() {
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;

        this.userService.logIn(email, password)
            .subscribe(
                user => {
                    if (user) {
                        console.log(user);
                        user = new User(user);
                        this.toastr.success("You are succesfully logged in!", "Welcome " + user.getUserFirstName());
                        this.router.navigateByUrl(this.returnUrl? this.returnUrl: user.getUserType()+'/general/select-course');
                        this.badgeModal.open();
                    } else {
                        console.log("User does not exists!");
                        this.warning = true;
                    }
                }, error => {
                    // login failed so display error
                    this.alertService.error(error);
                }
            );
    }

    keyPressed() {
        this.warning = false;
    }

    userSignUp() {
        this.router.navigate(['/sign-up']);
    }

    userChangePassword() {
        this.router.navigate(['change-password']);
    }

    get email() {
        return this.loginForm.get('email') as FormControl;
    }

    get password() {
        return this.loginForm.get('password') as FormControl;
    }
}
