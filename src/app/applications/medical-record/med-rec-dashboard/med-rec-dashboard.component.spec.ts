import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedRecDashboardComponent } from './med-rec-dashboard.component';

describe('MedRecDashboardComponent', () => {
  let component: MedRecDashboardComponent;
  let fixture: ComponentFixture<MedRecDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedRecDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedRecDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
