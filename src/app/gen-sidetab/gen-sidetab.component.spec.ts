import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenSidetabComponent } from './gen-sidetab.component';

describe('GenSidetabComponent', () => {
  let component: GenSidetabComponent;
  let fixture: ComponentFixture<GenSidetabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenSidetabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenSidetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
