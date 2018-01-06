import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PageService {

  @Output() isProfile: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  isProfilePage(isProfile){
    this.isProfile.emit(isProfile);
  }

  
}
