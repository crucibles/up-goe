//Core Imports
import {
  Component, 
  OnInit
} from '@angular/core';

@Component({
  selector: 'gen-topnavbar',
  templateUrl: './gen-topnavbar.component.html',
  styleUrls: ['./gen-topnavbar.component.css']
})
export class GenTopnavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * Logs out the current user
   */
  logout() {
  }
}
