//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute, ParamMap
} from '@angular/router';
import { SectionService } from 'shared/services';

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
    this.sectionService.setCurrentSection(this.sectionId);
  }

  ngOnInit() {
    this.route.firstChild.paramMap.subscribe((params: ParamMap) => {
      this.sectionId = params.get("sectionId");
    });
  }

}
