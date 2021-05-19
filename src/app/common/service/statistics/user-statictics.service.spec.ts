import { TestBed } from '@angular/core/testing';

import { UserStaticticsService } from './user-statictics.service';

describe('UserStaticticsService', () => {
  let service: UserStaticticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStaticticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
