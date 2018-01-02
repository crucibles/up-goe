//Core Imports
import {
  Component, 
  OnInit
} from '@angular/core';

import { 
  UserService 
} from '../user.service';

@Component({
  selector: 'gen-topnavbar',
  templateUrl: './gen-topnavbar.component.html',
  styleUrls: ['./gen-topnavbar.component.css']
})
export class GenTopnavbarComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  /**
   * Logs out the current user
   */
  logout() {
    this.userService.logOut();
  }
}
