import {  RegisterSubscriberComponent } from './page/register-subscriber/register-subscriber.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './page/login/login.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './page/register/register.component';
import { MessageComponent } from './page/message/message.component';
import { ChangeMessageComponent } from './page/change-message/change-message.component';
import { SharedModule } from '../../shared/shared.module';
import { PaymentComponent } from './page/payment/payment.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RegisterSubscriberComponent,
    ResetPasswordComponent,
    MessageComponent,
    RegisterComponent,
    ChangeMessageComponent,
    PaymentComponent,
  ],

  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthenticationModule {}
