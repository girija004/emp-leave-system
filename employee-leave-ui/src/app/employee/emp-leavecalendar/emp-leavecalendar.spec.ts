import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLeaveCalendar } from './emp-leavecalendar';

describe('EmpLeavecalendar', () => {
  let component: EmpLeaveCalendar;
  let fixture: ComponentFixture<EmpLeaveCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpLeaveCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpLeaveCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
