import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachManagerComponent } from './coach-manager.component';

describe('CoachManagerComponent', () => {
  let component: CoachManagerComponent;
  let fixture: ComponentFixture<CoachManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachManagerComponent]
    });
    fixture = TestBed.createComponent(CoachManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
