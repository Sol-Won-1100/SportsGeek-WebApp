import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { usersBaseURL } from '../../constants/http-urls';
import { NewPasswordModel } from '../../model/change-password/NewPassword';
import { RoleModel } from '../../model/role/role';
import { UserModel } from '../../model/user/user-model';
import { UserWithPasswordModel } from '../../model/user/user-with-password-model';
import { AuthenticationService } from '../authentication_service/authentication.service';

// let userBaseUrl = 'http://localhost:8081/users';
// let addUserUrl = 'http://localhost:8081/users/add-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  async getAllUser(): Promise<any> {
    return await this.http.get<UserModel>(usersBaseURL, { observe: 'response' }).toPromise();
  }

  async getUserById(userId:number): Promise<any> {
    return await this.http.get<UserModel>(usersBaseURL + '/' + userId , { observe: 'response' }).toPromise();
  }

  async updateRole(userId:number,roleId:number): Promise<any> {
    return await this.http.put<RoleModel>(usersBaseURL + '/' + userId + '/update-role' + '/' + roleId, { observe: 'response' }).toPromise();
  }

  // async signup(userWithPasswordModel: UserWithPasswordModel): Promise<any> 
  async signup(formData:FormData): Promise<any> 
  {
    return await this.http.post<UserWithPasswordModel>(usersBaseURL + '/register', formData, { observe: 'response' }).toPromise();
  }

  // async addUser(userModel: UserModel): Promise<any> {
  //   return await this.http.post<UserWithPasswordModel>(usersBaseURL + '/register', userModel, { observe: 'response' }).toPromise();
  // }

  // async updateUser(userId: number, model: UserModel): Promise<any> {
  async updateUser(userId: number, formData: FormData): Promise<any> {
    return await this.http.put<UserModel>(usersBaseURL + '/' + userId, formData, { observe: 'response' }).toPromise();
  }

  async deleteUser(userId: number): Promise<any> {
    return await this.http.delete<UserModel>(usersBaseURL + '/' + userId , { observe: 'response' }).toPromise();
  }

  async updateActiveStatus(userId: number, isActive: boolean): Promise<any> {
    return await this.http.put<any>(usersBaseURL + '/' + userId + '/' + 'update-status/' + isActive, { observe: 'response' }).toPromise();
  }

  async updatePassword(newPasswordModel: NewPasswordModel): Promise<any> {
    return await this.http.put<NewPasswordModel>(usersBaseURL + '/update-password', newPasswordModel, { observe: 'response' }).toPromise();
  }
}
