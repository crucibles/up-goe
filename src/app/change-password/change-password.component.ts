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

import {
    ToastsManager
} from 'ng2-toastr';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
    private changePassForm: FormGroup;

    constructor(
        formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private toastr: ToastsManager
    ) {
        this.changePassForm = formBuilder.group({
            inputEmail: null
        });
    }

    find() {
        let user_email = this.changePassForm.value.inputEmail;
        this.userService.getUserReqPass(user_email).subscribe(user => {
            if(user) {
                this.toastr.success("An email has been sent to \"" + user_email + "\"", "Success!");
            } else {
                this.toastr.warning("Sorry, the email \"" + user_email + "\" does not exists.", "Warning!");
            }
        }, error => {
            console.log(error);
        });

        this.changePassForm.reset();
    }

    // Redirects to the login page.
    goToLogin() {
        this.router.navigate(['/log-in']);
    }

    get inputEmail() {
        return this.changePassForm.get('inputEmail') as FormControl;
    }

    ngOnInit() {
    }
}
