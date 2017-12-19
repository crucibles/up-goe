import {
  async, 
  ComponentFixture, 
  TestBed
} from '@angular/core/testing';

import {
  GenSelcourseComponent
} from './gen-selcourse.component';

describe('GenSelcourseComponent', () => {
  let component: GenSelcourseComponent;
  let fixture: ComponentFixture<GenSelcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenSelcourseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenSelcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
