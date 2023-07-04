import { PatternValidator, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'YoungPotentials';
  currentUrl= "";
  constructor(public router: Router){}

  ngOnInit(){
    this.router.events
    .pipe(
      filter(e => e instanceof NavigationEnd)
    )
    .subscribe( (navEnd:NavigationEnd) => {
      this.currentUrl = navEnd.urlAfterRedirects;
    });  
  }

}
