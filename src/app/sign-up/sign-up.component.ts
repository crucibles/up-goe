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
    UserService
} from 'shared/services';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    private signupForm: FormGroup;
    // To determine the a duplicate email upon input.
    duplicate: string = null;
    // Stored here is the security questions in the sign up form.
    private questions: string[] = new Array();

    constructor(
        formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private toastr: ToastsManager
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
        let userConditions = {
            hp: "",
            xp: 0,
            ailment: "",
            status: "",
            log_in_streak: 0,
            log_in_total: [],
            items: [],
            items_used: [],
            items_owned: [],
            head: "",
            left_leg: "",
            right_leg: "",
            left_arm: "",
            right_arm: "",
        }

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
            securityAnswer,
            userConditions
        ).subscribe(newUser => {
            if (newUser) {
                // Successful registration of user and redirects to login page.
                this.router.navigate(['/log-in']);
                this.toastr.success("Try logging in!", "Account created!");
            } else {
                // Unsuccessful registration of new user because of email already existing.
                // Sets signal to prompt warning message of already existing email.
                this.toastr.warning("Email already existed", "Failed to register");
                this.duplicate = email;
            }
        });
    }

    // Acquires the security questions from the database.
    getSecurityQuestions() {
        this.userService.getSecurityQuestions().subscribe(questions => {
            for (var x = 0; x < (questions[0].question.length); x++) {
                this.questions.push(questions[0].question[x]);
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
        this.getSecurityQuestions();
    }
}