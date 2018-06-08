//Core Imports
import {
  Component,
  OnInit,
  ElementRef
} from '@angular/core';

import {
  Router
} from '@angular/router';

//Application Import 
import {
  UserService
} from 'shared/services'

@Component({
  selector: 'gen-topnavbar',
  templateUrl: './gen-topnavbar.component.html',
  styleUrls: ['./gen-topnavbar.component.css'],
  host: {
		'(document:click)': 'handleClick($event)',
	}
})
export class GenTopnavbarComponent implements OnInit {
  isCollapsed: boolean;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isCollapsed = true;
  }

  /**
   * Logs out the current user
   */
  logOut() {
    this.userService.logOut();
  }

  /* Helper function */
  handleClick(event) {
		var clickedComponent = event.target;
		var inside = false;
		do {
			if (clickedComponent === this.elementRef.nativeElement) {
				inside = true;
			}
			clickedComponent = clickedComponent.parentNode;
		} while (clickedComponent);
		if (!inside) {
      this.isCollapsed = true;
		}
	}
}
