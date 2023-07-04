import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './page/policy/policy.component';

@NgModule({
  declarations: [PolicyComponent],
  imports: [CommonModule, PolicyRoutingModule, SharedModule],
})
export class PolicyModule {}
