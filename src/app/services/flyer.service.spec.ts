import { TestBed } from '@angular/core/testing';

import { FlyerService } from './flyer.service';

describe('FlyerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlyerService = TestBed.get(FlyerService);
    expect(service).toBeTruthy();
  });
});
