import { UserSaveDTO } from './../../models/dto/userSaveDTO';
import { TokenDTO } from './../../models/dto/tokenDTO';
import { DecodedToken } from './../../models/decodedToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from './../../models/userToken';
import { Token } from './../../models/token';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../user/user.service';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  val: any;
  localStorageKeyUser = 'user'
  localStorageKeyToken = 'token'
  apiUrl = environment.apiUrl;
  loggedInUserFromStorage: BehaviorSubject<User>;
  loggedInUser: Observable<User>;

  userReadyToPay: UserSaveDTO

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.loggedInUserFromStorage = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(this.localStorageKeyUser))
    );
    this.loggedInUser = this.loggedInUserFromStorage.asObservable();
  }

  login(email: string, password: string): Observable<TokenDTO>{
    let form = new FormData();
    form.append("email", email)
    form.append("password", password)
    return this.http
      .post<any>(`${this.apiUrl}login`, form)
      .pipe(
        tap((tokenResponse: TokenDTO) => {
          const userToken = new UserToken(tokenResponse)
          if (userToken) {
            //Saving user data in local storage
            this.userService.storeUser(userToken.user);
            this.storeToken(userToken.token)
            //Updating logged in user observable
            this.loggedInUserFromStorage.next(userToken.user);
          }
        },(error) => {
          return throwError(error)
        }))
  }

  /**
   * @description registers the user as a student or company
   * @param registerUser data needed to register as an user (student or company)
   */
  register(userSaveDTO: UserSaveDTO) {
    return this.http
      .post<any>(`${this.apiUrl}user/save`, userSaveDTO)
      .pipe(
        tap((userData) => {
          if (userData) {
            this.router.navigate(['/authentication'])
          }
        }),
        catchError((error) => {
          console.log(error)
          return throwError(error);
        })
      );
  }

  storeToken(token: Token){
    localStorage.setItem(this.localStorageKeyToken, JSON.stringify(token));
  }

  getToken(): Token{
    const json = JSON.parse(localStorage.getItem(this.localStorageKeyToken))
    const token: Token = <Token>json
    return token
  }

  getAccessToken(): string {
    return this.getToken() ? this.getToken().access_token : null
  }

  getRefreshToken(): string {
    return this.getToken() ? this.getToken().refresh_token : null
  }

  /**
   * @description Logs out the user by deleting local storage
   */
  logout() {
    localStorage.removeItem(this.localStorageKeyToken);
    localStorage.removeItem(this.localStorageKeyUser)
    this.loggedInUserFromStorage.next(null);
    this.router.navigate(['/']);
  }

  /**
   * @description Returns true if there is a JWT token otherwise false
   */
  isLoggedIn() {
    return !!this.userService.getUser() && !!this.getAccessToken();
  }

  /**
   * @description Returns the diplayname
   */
  getDisplayName() {
    let user = this.userService.getUser();
    if (user != null) {
        return user.name
    }
  }

  getRoles(){
    let token: Token = this.getToken()
    let access_token: string = token.access_token
    let decoded_token: DecodedToken = this.jwtHelper.decodeToken(access_token)
    return decoded_token.roles
  }
}
