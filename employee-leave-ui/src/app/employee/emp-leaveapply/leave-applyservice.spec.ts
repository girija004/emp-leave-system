import { TestBed } from '@angular/core/testing';

import { LeaveApplyservice } from './leave-applyservice';

describe('LeaveApplyservice', () => {
  let service: LeaveApplyservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveApplyservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
