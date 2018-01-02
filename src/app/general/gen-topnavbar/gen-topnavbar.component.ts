//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

@Component({
  selector: 'gen-topnavbar',
  templateUrl: './gen-topnavbar.component.html',
  styleUrls: ['./gen-topnavbar.component.css']
})
export class GenTopnavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * Logs out the current user
   */
  logout() {
    this.router.navigate(['/log-in']);
  }
}
