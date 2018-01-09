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
  selector: 'app-specific-character',
  templateUrl: './specific-character.component.html',
  styleUrls: ['./specific-character.component.css']
})
export class SpecificCharacterComponent implements OnInit {

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
