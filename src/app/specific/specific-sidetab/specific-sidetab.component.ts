//Core Imports
import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
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
  selector: 'specific-sidetab',
  templateUrl: './specific-sidetab.component.html',
  styleUrls: ['./specific-sidetab.component.css']
})
export class SpecificSidetabComponent implements OnInit {
  user: User;
  isProfile: boolean = true;
  editForm: FormGroup;
  isEditing: boolean = false;

  image: string = "";

  // for collapsible sidetab
  isShowMenuButton: boolean = false;
  windowWidth: number = window.innerWidth;

  //if screen size changes it'll update
  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.checkSize();
  }

  checkSize() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth <= 765) {
      this.isShowMenuButton = true;
    } else {
      this.isShowMenuButton = false;
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.getUser();
    this.editForm = this.formBuilder.group({
      schoolId: new FormControl(this.user.getUserSchoolId(), Validators.required),
      email: new FormControl(this.user.getUserEmail(), Validators.required),
      contactNo: new FormControl(this.user.getUserContactNo(), Validators.required),
    });
    this.editForm.disable();
    this.checkSize();
  }

  getUser() {
    //AHJ: current user is not yet obtained
    this.user = this.userService.getCurrentUser();
    let image: string = this.user.getUserPhoto() ?
      this.user.getUserPhoto() :
      "avatar.jpg";
    this.image = "/assets/images/" + image;
  }

  endEditing() {
    this.isEditing = !this.isEditing;
    this.editForm.disable();
  }

  startEditing() {
    this.isEditing = !this.isEditing;
    this.editForm.enable();
  }
}
