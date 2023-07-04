import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../modules/header/header.component';
import { TranslateServiceStub, TranslationModule } from '../translation/translation.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

//TODO: Deze x3

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModule,
        TranslationModule,
      ],
        providers: [
          AppComponent, 
          { provide: HttpClient, useValue: spy },
        ]
    });

    fixture = TestBed.createComponent(AppComponent);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'YoungPotentials'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('YoungPotentials');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('YoungPotentials app is running!');
  });
});
