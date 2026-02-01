import { TestBed } from '@angular/core/testing';

import { Empleaveservice } from './empleaveservice';

describe('Empleaveservice', () => {
  let service: Empleaveservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Empleaveservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
