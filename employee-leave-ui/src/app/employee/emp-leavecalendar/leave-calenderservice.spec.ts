import { TestBed } from '@angular/core/testing';

import { LeaveCalenderservice } from './leave-calenderservice';

describe('LeaveCalenderservice', () => {
  let service: LeaveCalenderservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveCalenderservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
