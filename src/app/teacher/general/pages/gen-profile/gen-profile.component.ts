// Core Imports
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

//Application Imports
import {
  User
} from 'shared/models';

import {
  UserService
} from 'shared/services';

@Component({
  selector: 'app-gen-profile',
  templateUrl: './gen-profile.component.html',
  styleUrls: ['./gen-profile.component.css']
})
export class GenProfileComponent implements OnInit {
  currentUser: User;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  /**
   * Obtains information of the current user
   */
  getUser(): void {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userService.getUser(currentUser._id)
      .subscribe(user => {
        this.currentUser = new User(user);
        this.initializeForm();
      });
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      schoolId: new FormControl(this.currentUser.getUserSchoolId()),
      email: new FormControl(this.currentUser.getUserEmail(), Validators.required),
      contactNo: new FormControl(this.currentUser.getUserContactNo(), Validators.required),
    });
    this.userForm.disable();
  }

}
