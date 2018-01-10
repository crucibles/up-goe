//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute, ParamMap
} from '@angular/router';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit {

  private sectionId: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.firstChild.paramMap.subscribe((params: ParamMap) => {
      this.sectionId = params.get("sectionId");
    });
  }

}
