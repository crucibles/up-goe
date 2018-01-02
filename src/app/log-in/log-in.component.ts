import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(
    formBuillder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = formBuillder.group({
      email: null,
      password: null
    });
  }

  ngOnInit() {
  }

  logIn() {
    let email = this.signupForm.value.email;
    let password = this.signupForm.value.password;

    this.userService.logIn(email, password).subscribe(user => {
      if (user) {
        this.router.navigate(['/select-course']);
      } else {
        console.log("does not exists!");
      }
    });
  }

}
