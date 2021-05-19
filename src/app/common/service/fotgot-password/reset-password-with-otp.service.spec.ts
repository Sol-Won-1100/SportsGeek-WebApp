import { TestBed } from '@angular/core/testing';

import { ResetPasswordWithOtpService } from './reset-password-with-otp.service';

describe('ResetPasswordWithOtpService', () => {
  let service: ResetPasswordWithOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordWithOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
