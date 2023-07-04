import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
    providers: [
      JwtInterceptor,
      { provide: HttpClient, useValue: spy }
    ],
  });
  httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
