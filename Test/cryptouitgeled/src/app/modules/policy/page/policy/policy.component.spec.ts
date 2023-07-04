import { HttpClient } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslationModule } from 'src/app/translation/translation.module';
import { PolicyModule } from '../../policy.module';

import { PolicyComponent } from './policy.component';

describe('PolicyComponent', () => {
  let component: PolicyComponent;
  let fixture: ComponentFixture<PolicyComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(
    waitForAsync(() => {
      const spy = jasmine.createSpyObj('HttpClient', ['get']);
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, PolicyModule, TranslationModule],
        providers: [PolicyComponent, { provide: HttpClient, useValue: spy }],
      });

      fixture = TestBed.createComponent(PolicyComponent);
      httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
