import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './page/faq/faq.component';

import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [FaqComponent],
  imports: [CommonModule, FaqRoutingModule, SharedModule, MatExpansionModule],
})
export class FaqModule {}
