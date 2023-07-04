import { ArticleService } from './../../../data/services/article/article.service';
import { ArticleBodyDTO } from '../../../data/models/dto/articleBodyDTO';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-full-view',
  templateUrl: './article-full-view.component.html',
  styleUrls: ['./article-full-view.component.scss']
})
export class ArticleFullViewComponent implements OnInit {

  private routeSub: Subscription;

  articleBody: ArticleBodyDTO

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id']
      this.articleService.getArticleBody(id).subscribe((body: ArticleBodyDTO) => {
        this.articleBody = body
      })

    })
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe()
  }

}
