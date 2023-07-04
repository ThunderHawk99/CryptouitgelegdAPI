import { ArticleSaveDTO } from './../../../data/models/dto/articleSaveDTO';
import { ArticleBodyDTO } from './../../../data/models/dto/articleBodyDTO';
import { ArticleService } from './../../../data/services/article/article.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {

  title = new FormControl()
  image = new FormControl()
  article = new FormControl()

  isError: boolean = false
  isLoading: boolean = false
  isSubmitted: boolean = false
 

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("clicked")
    const body: ArticleBodyDTO = new ArticleBodyDTO(this.article.value)
    const articleSave: ArticleSaveDTO = new ArticleSaveDTO(this.title.value, this.image.value, body)
    this.articleService.saveArticle(articleSave).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })
    console.log(this.article.value)
  }

}
