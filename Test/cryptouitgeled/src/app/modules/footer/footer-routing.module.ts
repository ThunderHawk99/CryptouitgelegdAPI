import { FooterComponent } from './page/footer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  

  //Routes
  { path: '', component: FooterComponent },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooterRoutingModule { }
