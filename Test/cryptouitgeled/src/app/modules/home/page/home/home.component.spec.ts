import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslationModule } from 'src/app/translation/translation.module';
import { HomeModule } from '../../home.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(
    waitForAsync(() => {
      const spy = jasmine.createSpyObj('HttpClient', ['get']);
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HomeModule, TranslationModule],
        providers: [HomeComponent, { provide: HttpClient, useValue: spy }],
      });

      fixture = TestBed.createComponent(HomeComponent);
      httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
