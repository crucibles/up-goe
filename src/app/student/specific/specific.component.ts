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

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService
  ) {
  }

  ngOnInit() {
    this.route.firstChild.paramMap.subscribe((params: ParamMap) => {
      this.sectionId = params.get("sectionId");
    });
    this.sectionService.setCurrentSectionId(this.sectionId);

    this.sectionService.searchSection(this.sectionId).subscribe((searched) => {

      this.sectionService.getCourse(searched[0].section.course_id).subscribe((x) => {
        this.sectionService.setCurrentCourse(new Course(x));
      });

      this.sectionService.setCurrentCourseSection(searched[0]);

      this.sectionService.setCurrentSection(new Section(searched[0].section));

    })
  }

}
