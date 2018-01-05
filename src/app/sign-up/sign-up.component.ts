//Core Imports
import { 
  Component, 
  OnInit 
} from '@angular/core';

import { 
  FormGroup, 
  FormControl, 
  FormBuilder 
} from '@angular/forms';

//Application Imports
import { 
  SECURITY_QUESTION 
} from 'shared/models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signupForm: FormGroup;
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

  submit() {
    console.log(this.signupForm.value);
  }

  reset() {
    this.signupForm.reset();
  }

  ngOnInit() {
  }

}
