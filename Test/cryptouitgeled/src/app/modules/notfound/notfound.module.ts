import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotFoundRoutingModule } from './notfound-routing.module';
import { NotFoundComponent } from './page/notfound.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, SharedModule],
})
export class NotFoundModule {}
