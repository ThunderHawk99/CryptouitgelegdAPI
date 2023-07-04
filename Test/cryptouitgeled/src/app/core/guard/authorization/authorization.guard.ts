import { Role } from '../../../data/models/role';
import { AuthenticationService } from 'src/app/data/services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
/**
 * @description This guard prevents unauthenticated users from accessing certain routes
 */
export class AuthorizationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url
    return this.checkUserLogin(route, url)
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean{
    if(this.authService.isLoggedIn()){
      const userRoles: Role[] = this.authService.getRoles();
      const authRole: Role = route.data.role
      if(authRole && !this.checkPermission(userRoles, authRole)){
        this.router.navigate(['/'])
        return false;
      }
      return true;
    }

    this.router.navigate(['/authentication'])

  }

  checkPermission(roles: Role[], authRole: Role): boolean{
    return roles.includes(authRole);
  }
}
