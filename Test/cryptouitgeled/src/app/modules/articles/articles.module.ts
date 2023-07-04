import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { UnsafeHTML } from './../../core/helpers/unsafeHTML';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesOverviewComponent } from './articles-overview/articles-overview.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleFullViewComponent } from './article-full-view/article-full-view.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleTestComponent } from './article-test/article-test.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ArticlePreviewListComponent } from './article-preview-list/article-preview-list.component';



@NgModule({
  declarations: [
    ArticlesOverviewComponent, 
    ArticlePreviewComponent, 
    ArticleFullViewComponent,
    UnsafeHTML,
    ArticleCreateComponent,
    ArticleTestComponent,
    ArticlePreviewListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports: [
    CommonModule
  ]
})
export class ArticlesModule { }
