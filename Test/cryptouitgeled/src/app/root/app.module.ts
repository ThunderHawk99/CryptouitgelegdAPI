import { TranslationModule } from '../translation/translation.module';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from '../shared/shared.module'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtInterceptor } from '../core/interceptor/jwt/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent} from '../modules/header/header.component'

import { FooterModule } from './../modules/footer/footer.module';

import { CookieComponent } from "../modules/cookie/cookie.component";

import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CookieComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    TranslationModule,
    FormsModule,
    FooterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}



