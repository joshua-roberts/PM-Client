import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorDemoComponent } from './translator-demo.component';

describe('TranslatorDemoComponent', () => {
  let component: TranslatorDemoComponent;
  let fixture: ComponentFixture<TranslatorDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatorDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
