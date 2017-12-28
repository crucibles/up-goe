import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenNewsComponent } from './gen-news.component';

describe('GenNewsComponent', () => {
  let component: GenNewsComponent;
  let fixture: ComponentFixture<GenNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
