import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendOtpForForgotPassword } from '../../model/change-password/sendotp';

let userBaseUrl = 'http://localhost:8081/users';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordWithOtpService {

  constructor(private http: HttpClient) { }

  async sendOtp(otp: SendOtpForForgotPassword): Promise<any> {
    return await this.http.post<SendOtpForForgotPassword>(userBaseUrl + '/send-otp', otp, { observe: 'response' }).toPromise();
  }

  async updateForgotPassword(forgotPassword: SendOtpForForgotPassword): Promise<any> {
    return await this.http.put<SendOtpForForgotPassword>(userBaseUrl + '/forget-password', forgotPassword, { observe: 'response' }).toPromise();
  }
}
