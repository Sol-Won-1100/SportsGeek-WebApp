import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usersBaseURL } from '../../constants/http-urls';
import { NewPasswordModel } from '../../model/change-password/NewPassword';

// let userBaseUrl = 'http://localhost:8081/users';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  async updatePassword(newPasswordModel: NewPasswordModel): Promise<any> {
    return await this.http.put<NewPasswordModel>(usersBaseURL + '/update-password', newPasswordModel, { observe: 'response' }).toPromise();
  }

}
