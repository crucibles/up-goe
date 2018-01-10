// Core imports
import { 
    Component, 
    OnInit
} from '@angular/core';

import { 
    FormBuilder, 
    FormControl,
    FormGroup,
    Validators 
} from '@angular/forms';

import { 
    Router 
} from '@angular/router';

// Application imports
import { 
    UserService 
} from 'shared/services';

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
    private loginForm: FormGroup;
    private warning: boolean;

    constructor(
        formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {
        this.loginForm = formBuilder.group({
            email: [null, Validators.email],
            password: null
        });
        this.warning = false;
    }

    logIn() {
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;

        this.userService.logIn(email, password).subscribe(user => {
            if (user) {
                this.router.navigate(['/general/select-course']);
            } else {
                console.log("User does not exists!");
                this.warning = true;
            }
        });
    }

    keyPressed() {
        this.warning = false;
    }

    userSignUp() {
        this.router.navigate(['/sign-up']);
    }

    userChangePassword() {
        this.router.navigate(['**']);
    }

    get email() {
        return this.loginForm.get('email') as FormControl;
    }

    get password() {
        return this.loginForm.get('password') as FormControl;
    }

    ngOnInit() {
    }
}
