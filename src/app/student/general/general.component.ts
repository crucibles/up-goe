//Core Imports
import {
  Component,
  OnInit
} from '@angular/core';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

}
