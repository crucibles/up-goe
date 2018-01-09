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
  selector: 'app-specific-quest-map',
  templateUrl: './specific-quest-map.component.html',
  styleUrls: ['./specific-quest-map.component.css']
})
export class SpecificQuestMapComponent implements OnInit {

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
