import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { Role } from 'src/app/data/models/role';
import { User } from 'src/app/data/models/user';
import { AuthenticationService } from 'src/app/data/services/authentication/authentication.service';
import { UserService } from 'src/app/data/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  //The current user
  currentUser: User;

  //Displayed user name
  displayName: String;

  //Short display user name if user name exceeds 50 characters
  shortDisplayName: String;

  //Observable for screen changes
  resizeObservable$: Observable<any>;

  //Subscription for screen changes
  resizeSubscription$: Subscription;

  //Flag for mobile
  isMobile: boolean;

  //Flag for dropdown navbar mobile
  navbarOpen = true;

  showProfileDropdown: boolean = false

  //Subscription for user info
  private userInfoSub: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {
    this.currentUser = this.userService.getUser();
    this.displayName = authenticationService.getDisplayName();

    if (window.innerWidth <= 768) {
      this.isMobile = true;
    }
    this.resizeObservable$ = fromEvent(window, 'resize');
    this._listenForScreenChanges();
  }

  /**
   * @description Logs the user out
   */
  logOut() {
    this.authenticationService.logout();
    
  }

  /**
   * @description Check if user is logged in
   */
  ngOnInit() {
    this.authenticationService.loggedInUser.subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser != null) {
        this.setDisplayName(user)
      }
    });
    // this.userInfoSub = this.userService.userInfoChanged.subscribe(
    //   (user: User) => {
    //     this.setDisplayName(user);
    //   }
    // );
  }

  /**
   * @description Listen for screen changes
   */
  private _listenForScreenChanges() {
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      if (evt.target.innerWidth <= 768) {
        // 768px portrait
        this.isMobile = true;
      } else {
        this.isMobile = false;
        this.navbarOpen = true;
      }
    });
  }

setDisplayName(user:User) {
  this.displayName = user.name;
  this.shortDisplayName = this.displayName.substring(0, 50) + ' ...';
}

  /**
   * @description close the header if an option is clicked in mobile version and scrolls back to the top of the page
   */
  onActivate() {
    window.scrollTo(0, 0);
    if (this.isMobile) {
      this.navbarOpen = !this.navbarOpen;
    }
  }

  /**
   * @description Unsubscribe from user info
   */
  ngOnDestroy(): void {
    this.userInfoSub.unsubscribe();
  }

  /**
   * @description Opens the dropdown
   */
  openDropdown() {
    this.navbarOpen = true;
  }

  isAdmin(): boolean{
    if(this.authenticationService.getToken()){
      return this.authenticationService.getRoles().includes(Role.ADMIN)
    }
    return false;
  }

  showDropdownProfile(){
    this.showProfileDropdown = true
  }

  hideDropdownProfile(){
    this.showProfileDropdown = false
  }
}
