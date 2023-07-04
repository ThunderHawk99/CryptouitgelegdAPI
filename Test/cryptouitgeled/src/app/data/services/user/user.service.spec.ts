import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Role } from '../../models/role';
import { User } from '../../models/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [UserService, { provide: HttpClient, useValue: spy }],
    });

    userService = TestBed.inject(UserService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(userService).toBeTruthy();
  });
  
});
