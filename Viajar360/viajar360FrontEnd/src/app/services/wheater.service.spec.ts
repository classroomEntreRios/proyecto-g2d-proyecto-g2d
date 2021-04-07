import { TestBed } from '@angular/core/testing';

import { WheaterService } from './wheater.service';

describe('WheaterService', () => {
  let service: WheaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WheaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
