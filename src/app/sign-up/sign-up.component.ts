import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import {
  SECURITY_QUESTION
} from '../security-questions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private signupForm: FormGroup;
  private signal: boolean = false;
  questions = SECURITY_QUESTION;

  constructor(fb: FormBuilder) {
    this.signupForm = fb.group({
      firstName : null,
      middleName: null,
      lastName  : null,
      birthdate : null,
      schoolId  : null,
      email     : null,
      password  : null,
      confirmPassword: null,
      securityQuestion: null,
      securityAnswer: null
    });
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

  get schoolId() {
    return this.signupForm.get('schoolId') as FormControl;
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

  get securityQuestion() {
    return this.signupForm.get('securityQuestion') as FormControl;
  }

  get securityAnswer() {
    return this.signupForm.get('securityAnswer') as FormControl;
  }

  submit() {
    if(this.signupForm.invalid) {
      console.log("Invalid inputs!");
    }

    else {
      console.log(this.signupForm.value);
      // this.signal = false;
    }
  }

  reset() {
    this.signupForm.reset();
  }

  ngOnInit() {
  }

}
