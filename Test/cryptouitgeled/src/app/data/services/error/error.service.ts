import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  serverErrorChanged = new Subject<boolean>();

  constructor() {}

  /**
   * passes error to parent for display, used in filtercomponent
   * @param serverError 
   */
  updateServerError(serverError: boolean) {
    this.serverErrorChanged.next(serverError);
  }
}
