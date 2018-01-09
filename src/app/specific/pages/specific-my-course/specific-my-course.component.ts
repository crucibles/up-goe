//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

//Application Imports
import {
  PageService
} from 'shared/services';


@Component({
  selector: 'app-specific-my-course',
  templateUrl: './specific-my-course.component.html',
  styleUrls: ['./specific-my-course.component.css']
})
export class SpecificMyCourseComponent implements OnInit {

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.setDefault();
  }

  setDefault() {
    this.pageService.isProfilePage(false);
  }

}
