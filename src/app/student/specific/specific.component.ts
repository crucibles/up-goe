//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';

import {
  SectionService
} from 'shared/services';

import {
  Section,
  Course
} from 'shared/models';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit {

  private sectionId: string;
  private isDataLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public sectionService: SectionService
  ) {
  }

  ngOnInit() {

    this.route.firstChild.paramMap.subscribe((params: ParamMap) => {

      this.sectionId  = params.get("sectionId");
      this.sectionService.setCurrentSectionId(this.sectionId);
      
    });

    // searches the section to be initialized
    this.sectionService.searchSection(this.sectionId).subscribe((searched) => {

      // setting the current section the student is navigating
      this.sectionService.setCurrentSection(new Section(searched[0].section));

      // setting the current course section the student is navigating
      this.sectionService.setCurrentCourseSection(searched[0]);
      
      // setting the current course the student is navigating, and makes sure the data is loaded before rendering the html
      this.sectionService.getCourse(searched[0].section.course_id).subscribe((x) => {
        this.sectionService.setCurrentCourse(new Course(x));
        this.isDataLoaded = true;
      });

    });

    
  }

}
