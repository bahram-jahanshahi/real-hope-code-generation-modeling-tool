import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitButtonBarComponent } from './submit-button-bar.component';

describe('SubmitButtonBarComponent', () => {
  let component: SubmitButtonBarComponent;
  let fixture: ComponentFixture<SubmitButtonBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitButtonBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
