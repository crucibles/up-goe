//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

//Application Imports
import {
  UserService
} from 'shared/services';

@Component({
  selector: 'specific-topnavbar',
  templateUrl: './specific-topnavbar.component.html',
  styleUrls: ['./specific-topnavbar.component.css']
})
export class SpecificTopnavbarComponent implements OnInit {

  isCollapsed: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isCollapsed = true;
  }

  /**
   * Logs out the current user
   */
  logOut() {
    console.log("logout");
    this.userService.logOut();
  }
}
