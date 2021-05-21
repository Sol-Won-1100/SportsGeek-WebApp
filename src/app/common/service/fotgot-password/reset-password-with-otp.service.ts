import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersBaseURL } from '../../constants/http-urls';
import { ChangeForgotPassword } from '../../model/change-password/change-forgot-password';
import { SendOtpForForgotPassword } from '../../model/change-password/sendotp';

// let userBaseUrl = 'http://localhost:8081/users';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordWithOtpService {

  constructor(private http: HttpClient) { }

  async sendOtp(otp: SendOtpForForgotPassword): Promise<any> {
    return await this.http.post<SendOtpForForgotPassword>(usersBaseURL + '/forget-password', otp, { observe: 'response' }).toPromise();
  }

  async updateForgotPassword(forgotPassword: ChangeForgotPassword): Promise<any> {
    return await this.http.put<SendOtpForForgotPassword>(usersBaseURL + '/forget-password', forgotPassword, { observe: 'response' }).toPromise();
  }
}
