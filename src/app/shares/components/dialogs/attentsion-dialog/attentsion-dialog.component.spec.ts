import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentsionDialogComponent } from './attentsion-dialog.component';

describe('AttentsionDialogComponent', () => {
  let component: AttentsionDialogComponent;
  let fixture: ComponentFixture<AttentsionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentsionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentsionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
