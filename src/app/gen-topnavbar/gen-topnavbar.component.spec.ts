import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenTopnavbarComponent } from './gen-topnavbar.component';

describe('GenTopnavbarComponent', () => {
  let component: GenTopnavbarComponent;
  let fixture: ComponentFixture<GenTopnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenTopnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenTopnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
