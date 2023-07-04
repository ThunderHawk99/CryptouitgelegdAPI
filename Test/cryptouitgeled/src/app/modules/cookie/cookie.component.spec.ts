/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieComponent } from './cookie.component';
import { TranslationModule } from 'src/app/translation/translation.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppModule } from 'src/app/root/app.module';

describe('CookieComponent', () => {
  let component: CookieComponent;
  let fixture: ComponentFixture<CookieComponent>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule, TranslationModule],
      providers: [CookieComponent],
    });

    fixture = TestBed.createComponent(CookieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
