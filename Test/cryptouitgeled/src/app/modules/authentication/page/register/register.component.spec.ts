import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslationModule } from 'src/app/translation/translation.module';
import { AuthenticationModule } from '../../authentication.module';
import { LoginComponent } from '../login/login.component';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AuthenticationModule, TranslationModule],
      providers: [
        RegisterComponent,
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: HttpClient, useValue: spy },
      ],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
