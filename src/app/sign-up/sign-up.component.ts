//Core Imports
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

//Application Imports
import {
    SECURITY_QUESTION
} from 'shared/models';

import {
    UserService
} from 'shared/services';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    private signupForm: FormGroup;

    // Questions to be modified when database is updated.
    questions = SECURITY_QUESTION;

    // To determine the a duplicate email upon input.
    duplicate: string = null;

    constructor(
        formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {
        this.signupForm = formBuilder.group({
            schoolId: null,
            firstName: null,
            middleName: null,
            lastName: null,
            birthdate: null,
            // Validates the format of the email input.
            email: [null, Validators.email],
            password: null,
            confirmPassword: null,
            type: null,
            contactNumber: null,
            securityQuestion: null,
            securityAnswer: null
        });
        this.duplicate = null;
    }

    submit() {
        let schoolId = this.signupForm.value.schoolId;
        let firstName = this.signupForm.value.firstName;
        let middleName = this.signupForm.value.middleName;
        let lastName = this.signupForm.value.lastName;
        let birthdate = this.signupForm.value.birthdate;
        let email = this.signupForm.value.email;
        let password = this.signupForm.value.password;
        let type = this.signupForm.value.type;
        let contactNumber = this.signupForm.value.contactNumber;
        let securityQuestion = this.signupForm.value.securityQuestion; 
        let securityAnswer = this.signupForm.value.securityAnswer;

        this.userService.register(
            schoolId,
            firstName,
            middleName,
            lastName,
            birthdate,
            email,
            password,
            type,
            contactNumber,
            securityQuestion,
            securityAnswer
        ).subscribe(newUser => {
            // Successful registration of user and redirects to login page.
            if (newUser) {
                console.log("A new user is registered!");
                this.router.navigate(['/log-in']);
            }
            // Unsuccessful registration of new user because of email already existing.
            // Sets signal to prompt warning message of already existing email.
            else {
                console.log("New user failed to register!");
                this.duplicate = email;
            }
        });
    }

    // Resets the form inputs and the duplicate email warning signal.
    reset() {
        this.duplicate = null;
        this.signupForm.reset();
    }

    userLogin() {
        this.router.navigate(['/log-in']);
    }
    
    get schoolId() {
        return this.signupForm.get('schoolId') as FormControl;
    }

    get firstName() {
        return this.signupForm.get('firstName') as FormControl;
    }

    get middleName() {
        return this.signupForm.get('middleName') as FormControl;
    }

    get lastName() {
        return this.signupForm.get('lastName') as FormControl;
    }

    get birthdate() {
        return this.signupForm.get('birthdate') as FormControl;
    }

    get email() {
        return this.signupForm.get('email') as FormControl;
    }

    get password() {
        return this.signupForm.get('password') as FormControl;
    }

    get confirmPassword() {
        return this.signupForm.get('confirmPassword') as FormControl;
    }

    get type() {
        return this.signupForm.get('type') as FormControl;
    }

    get contactNumber() {
        return this.signupForm.get('contactNumber') as FormControl;
    }

    get securityQuestion() {
        return this.signupForm.get('securityQuestion') as FormControl;
    }

    get securityAnswer() {
        return this.signupForm.get('securityAnswer') as FormControl;
    }

    ngOnInit() {
    }

}
