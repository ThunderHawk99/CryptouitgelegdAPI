import { AuthorizationGuard } from '../core/guard/authorization/authorization.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * @description Consists of routes to every module
 * Every module contains a routing module with its routes
 */
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'articles',
    loadChildren: () => 
      import('../modules/articles/articles.module').then((m) => m.ArticlesModule),
      canActivate: [AuthorizationGuard],
      data: {
        role: 'ROLE_USER'
      }
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('../modules/faq/faq.module').then((m) => m.FaqModule),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('../modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('../modules/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { 
    path: 'policy',  
    loadChildren: () =>
      import('../modules/policy/policy.module').then((m) => m.PolicyModule),
  },
  { 
    path: 'notfound',  
    loadChildren: () =>
      import('../modules/notfound/notfound.module').then((m) => m.NotFoundModule),
  },
  { path: '**', redirectTo: 'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
