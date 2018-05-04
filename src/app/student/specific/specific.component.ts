//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute, ParamMap
} from '@angular/router';
import { SectionService } from 'shared/services';
import { Section } from 'shared/models';

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
    this.sectionService.setCurrentSectionId(this.sectionId);
    this.sectionService.setCurrentSection(new Section(this.sectionService.searchSection(this.sectionId)));
    console.warn("setting up");
    console.log(this.sectionService.getCurrentSection());
  }

  ngOnInit() {
    this.route.firstChild.paramMap.subscribe((params: ParamMap) => {
      this.sectionId = params.get("sectionId");
    });
  }

}
