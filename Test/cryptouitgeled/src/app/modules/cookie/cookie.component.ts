import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss'],
})
export class CookieComponent implements OnInit {
  //Flag to show the cookie or not
  show: boolean = false;

  constructor() {}

  /**
   * @description On init checks of cookie exists or not
   */
  ngOnInit() {
    this.checkIfCookieExists();
  }

  /**
   * @description Controleert indien er al een cookie bestaat genaamd "Cookie", indien hij onbestaand is dan wordt de cookie popup getoond.
   */
  checkIfCookieExists() {
    if (document.cookie.indexOf('cookie') === -1) {
      this.show = true;
    }
  }

  /**
   * @description Methode die ervoor zorgt dat de cookie pop up verdwijnt en de keuze ervan 60 dagen onthoudt.
   * @param accept  Indien true dan heeft men de cookie voorwaarden geaccepteerd,
   *                indien false dan heeft de gebruiker de negeer button aangeklikt.
   */
  btnClick(accept: boolean) {
    this.show = false;
    setCookie('cookie', accept, 365);
  }
}

/**
 * @description Cookie aanmaken
 * @param name Naam van de nieuwe cookie
 * @param value De waarde van de cookie
 * @param expireDays Wanneer de cookie vervalt
 * @param path De plaats waar de cookie staat
 */
export function setCookie(
  name: string,
  value: boolean,
  expireDays: number,
  path: string = ''
) {
  let d: Date = new Date();
  d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  let expires: string = `expires=${d.toUTCString()}`;
  let cpath: string = path ? `; path=${path}` : '';
  document.cookie = `${name}=${value}; ${expires}${cpath}`;
}
