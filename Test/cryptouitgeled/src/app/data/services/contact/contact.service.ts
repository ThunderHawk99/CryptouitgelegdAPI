import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../models/contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Sends contact form to api for contacting the contact@youngpotentials.org email
   * @param contact filled in contact form
   * @returns Ok
   */
  sendMail(contact: Contact) {
    return this.http.post<any>(`${this.apiUrl}mail/sendMail`, contact);
  }
}
