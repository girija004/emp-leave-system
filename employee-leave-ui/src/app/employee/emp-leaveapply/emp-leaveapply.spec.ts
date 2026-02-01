import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLeaveapply } from './emp-leaveapply';

describe('EmpLeaveapply', () => {
  let component: EmpLeaveapply;
  let fixture: ComponentFixture<EmpLeaveapply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpLeaveapply]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpLeaveapply);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
