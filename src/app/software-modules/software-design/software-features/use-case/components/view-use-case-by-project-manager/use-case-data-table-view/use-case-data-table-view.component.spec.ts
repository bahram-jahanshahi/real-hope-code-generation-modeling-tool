import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseDataTableViewComponent } from './use-case-data-table-view.component';

describe('UseCaseDataTableViewComponent', () => {
  let component: UseCaseDataTableViewComponent;
  let fixture: ComponentFixture<UseCaseDataTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseCaseDataTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseDataTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
