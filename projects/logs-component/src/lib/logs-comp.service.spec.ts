import { TestBed } from '@angular/core/testing';

import { LogsCompService } from './logs-comp.service';

describe('LogsCompService', () => {
  let service: LogsCompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsCompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
