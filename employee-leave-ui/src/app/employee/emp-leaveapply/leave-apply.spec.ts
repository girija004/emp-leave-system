import { TestBed } from '@angular/core/testing';

import { LeaveApply } from './leave-apply';

describe('LeaveApply', () => {
  let service: LeaveApply;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveApply);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
