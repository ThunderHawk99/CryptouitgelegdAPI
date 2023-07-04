import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  let contactService: ContactService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [ContactService, { provide: HttpClient, useValue: spy }],
    });

    contactService = TestBed.inject(ContactService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(contactService).toBeTruthy();
  });
});
