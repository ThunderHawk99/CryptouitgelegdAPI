import { AuthenticationService } from 'src/app/data/services/authentication/authentication.service';
import { Token } from './../../../data/models/token';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private jwtHelper: JwtHelperService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token: Token = this.authService.getToken()
    if (token) {
      if(!this.jwtHelper.isTokenExpired(token.access_token)){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });
      }else{
        this.authService.logout()
      }
    }

    return next.handle(request);
  }
}
