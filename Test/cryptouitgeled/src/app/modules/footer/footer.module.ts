import { FooterComponent } from './page/footer.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRoutingModule } from './footer-routing.module';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    FooterRoutingModule,
    SharedModule
  ],
  exports:[
    FooterComponent
  ]
})
export class FooterModule { }
