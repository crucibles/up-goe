import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificNewsComponent } from './specific-news.component';

describe('SpecificNewsComponent', () => {
  let component: SpecificNewsComponent;
  let fixture: ComponentFixture<SpecificNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
