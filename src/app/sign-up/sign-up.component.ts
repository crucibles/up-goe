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
} from '../shared/services';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    private signupForm: FormGroup;
    questions = SECURITY_QUESTION;

    constructor(
        fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {
        this.signupForm = fb.group({
            schoolId: null,
            firstName: null,
            middleName: null,
            lastName: null,
            birthdate: null,
            email: [null, Validators.email],
            password: null,
            confirmPassword: null,
            type: null,
            contactNumber: null,
            securityQuestion: null,
            securityAnswer: null
        });
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
            if (newUser) {
                console.log("A new user is registered!");
                this.router.navigate(['/log-in']);
            }
            else console.log("New user failed to register!");
        });
    }

    reset() {
        this.signupForm.reset();
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
