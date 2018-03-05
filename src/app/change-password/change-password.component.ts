// Core imports
import { 
    Component, 
    OnInit 
} from '@angular/core';

import {
    Router
} from '@angular/router';

import {
    FormBuilder,
    FormControl,
    FormGroup
} from '@angular/forms';

// Application imports
import { 
    UserService 
} from 'shared/services';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    private sent = false;
    private failSent = false;
    private changePassForm: FormGroup;
    private email;

    constructor(
        formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService
    ) {
        this.changePassForm = formBuilder.group({
            inputEmail: null
        });
    }

    get inputEmail() {
        return this.changePassForm.get('inputEmail') as FormControl;
    }

    find() {
        let user_email = this.changePassForm.value.inputEmail;
        this.userService.getUserReqPass(user_email).subscribe(user => {
            if(user) {
                this.email = user;
                this.sent = true;
            } else {
                this.failSent = true;
            }
        }, error => {
            console.log(error);
        });

        this.changePassForm.reset();
    }

    goToLogin() {
        this.router.navigate(['/log-in']);
    }

    ngOnInit() {
    }
}
