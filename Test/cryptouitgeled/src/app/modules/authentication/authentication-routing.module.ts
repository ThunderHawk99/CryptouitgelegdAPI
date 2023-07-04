import { PaymentComponent } from './page/payment/payment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeMessageComponent } from './page/change-message/change-message.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { LoginComponent } from './page/login/login.component';
import { MessageComponent } from './page/message/message.component';
import { RegisterComponent } from './page/register/register.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'wachtwoord-reseten', component: ResetPasswordComponent },
  { path: 'message', component: MessageComponent },
  { path: 'change-message', component: ChangeMessageComponent },
  { path: 'payment', component: PaymentComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
