import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenProfileComponent } from './gen-profile.component';

describe('GenProfileComponent', () => {
  let component: GenProfileComponent;
  let fixture: ComponentFixture<GenProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
