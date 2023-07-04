import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import {
  TranslateServiceStub,
  TranslationModule,
} from 'src/app/translation/translation.module';
import { AuthenticationModule } from '../../authentication.module';

import { ChangeMessageComponent } from './change-message.component';

describe('ChangeMessageComponent', () => {
  let component: ChangeMessageComponent;
  let fixture: ComponentFixture<ChangeMessageComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AuthenticationModule, TranslationModule],
      providers: [
        ChangeMessageComponent,
        { provide: HttpClient, useValue: spy },
      ],
    });

    fixture = TestBed.createComponent(ChangeMessageComponent);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
