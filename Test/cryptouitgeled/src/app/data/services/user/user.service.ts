import { emailValidator } from 'src/app/core/helpers/validator';
import { UserDTO } from './../../models/dto/userDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { RequestOptions, Request, Headers } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailRequest } from '../../models/emailRequest';
import { UpdatePasswordRequest } from '../../models/UpdatePasswordRequest';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  requestOptions: RequestOptions;
  localStorageKeyUser = 'user'
  apiUrl = environment.apiUrl;
  userInfoChanged = new Subject<User>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.requestOptions = new RequestOptions({
      headers: null,
      withCredentials: true,
    });
  }

  getUserByUsername(username: string): Observable<UserDTO>{
    return this.http.get<UserDTO>(`${this.apiUrl}user/get?username=${username}`);
  }

  getUserByEmail(email: string): Observable<UserDTO>{
    return this.http.get<UserDTO>(`${this.apiUrl}user/getByEmail?email=${email}`);
  }

  /**
   * @description returns all users
   */
  getAll() {
    return this.http.get<UserDTO[]>(`${this.apiUrl}user`);
  }

  /**
   * @description Saves user data such as the JWT token, email adress etc... in local storage
   * @param userData Data from the user
   */
  storeUser(user: User) {
    localStorage.setItem(this.localStorageKeyUser, JSON.stringify(user));
  }

  /**
   * @description returns the current user (from localstorage)
   */
  getUser() {
    let jsonObj: any = JSON.parse(localStorage.getItem(this.localStorageKeyUser));
    let user: User = <User>jsonObj;
    return user;
  }

  //* sends a mail with a link to reset password
  forgotPassword(object: EmailRequest)
  {
    return this.http.post<any>(`${this.apiUrl}user/password`, object);
  }

  //* resets password to new
  resetPassword(object: UpdatePasswordRequest)
  {
        const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': object.token
        })
      };
      return this.http.put<any>(`${this.apiUrl}user/password/reset`, object,  httpOptions)
  }
}
