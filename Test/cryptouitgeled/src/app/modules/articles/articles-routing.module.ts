import { ArticleTestComponent } from './article-test/article-test.component';
import { AuthorizationGuard } from '../../core/guard/authorization/authorization.guard';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleFullViewComponent } from './article-full-view/article-full-view.component';
import { ArticlesOverviewComponent } from './articles-overview/articles-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ArticlesOverviewComponent },
  { path: 'overview', component: ArticlesOverviewComponent },
  { path: 'full/:id', component: ArticleFullViewComponent},
  { path: 'create', component: ArticleCreateComponent, canActivate: [AuthorizationGuard], data: {role: 'ROLE_ADMIN'}},
  { path: 'test', component: ArticleTestComponent, canActivate: [AuthorizationGuard], data: {role: 'ROLE_ADMIN'}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
