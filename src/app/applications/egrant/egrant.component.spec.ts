import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgrantComponent } from './egrant.component';

describe('EgrantComponent', () => {
  let component: EgrantComponent;
  let fixture: ComponentFixture<EgrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
