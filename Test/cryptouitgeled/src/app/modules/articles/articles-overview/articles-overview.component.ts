import { fromEvent, Observable, Subscription } from 'rxjs';
import { TagDTO } from './../../../data/models/dto/tagDTO';
import { TagService } from './../../../data/services/tag/tag.service';
import { ArticleDTO } from './../../../data/models/dto/articleDTO';
import { ArticleService } from './../../../data/services/article/article.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-articles-overview',
  templateUrl: './articles-overview.component.html',
  styleUrls: ['./articles-overview.component.scss']
})
export class ArticlesOverviewComponent implements OnInit {
  originalArticles: ArticleDTO[] = [];
  articles: ArticleDTO[] = [];
  originalTags: TagDTO[] = []
  tags: TagDTO[] = []
  isListLayout: boolean = false;
  isLoading: boolean = false
  isError: boolean = false
  errorMessage: string = ""

  lowValue: number = 0;
  highValue: number = 10;

  titleFilter ="Zoek op titel"

    //Observable for screen changes
    resizeObservable$: Observable<any>;

    //Subscription for screen changes
    resizeSubscription$: Subscription;
  
    //Flag for mobile
    isMobile: boolean;

  constructor(private articleService: ArticleService, private tagService: TagService) {
    if (window.innerWidth <= 768) {
      this.isMobile = true;
    }
    this.resizeObservable$ = fromEvent(window, 'resize');
    this._listenForScreenChanges()
  }

  ngOnInit(): void {
    this.isLoading = true
    this.articleService.getAll().subscribe((articles: ArticleDTO[]) => {
      let article = articles[0]
      const newArticle = new ArticleDTO()
      this.articles = articles;
      this.articles.push(newArticle)
      this.originalArticles = this.articles

      this.isLoading = false
    },error => {
      this.isError = true
      this.errorMessage = "An unknown error occured please call the admin for further information."
      this.isLoading = false
    })
    this.tagService.getAll().subscribe(tags => {
      this.originalTags = tags
      this.tags = tags
    })
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  onClickTag(tag:TagDTO){
    tag.isActive = !tag.isActive
  }

  filterOnTags(){
    const filters = this.tags.filter(tag => tag.isActive).map(tag => tag.name)
    let newArticles = []
    filters.forEach(filter => {
      const temp = this.originalArticles.filter(article => article.tags.find(tag => tag.name === filter))
      newArticles = [...newArticles, ...temp]
    })
    if(filters.length !== 0){
      this.articles = newArticles.filter((item, index, self) => self.indexOf(item) === index);;
    }else{
      this.articles = this.originalArticles
      console.log(this.articles)
    }
  }

  clearFilterTags(){
    this.tags.forEach(tag => tag.isActive = false)
    this.articles = this.originalArticles
    this.titleFilter ="Zoek op titel"
  }

  hasActiveTag(){
    let hasActive:boolean = false
    this.tags.forEach(tag => {
      if(tag.isActive){
        hasActive = true;
      }
    })
    return hasActive
  }

  searchOnTitle(){
    this.articles = this.articles.filter(article => article.title.toLowerCase().includes(this.titleFilter.toLowerCase()))
  }

  onTitleFilterChange(title){
    console.log(title)
  }

  switchToList(){
    if(!this.isMobile){
      this.isListLayout = true
    }
  }

  switchToGrid(){
    this.isListLayout = false
  }

  /**
   * @description Listen for screen changes
   */
   private _listenForScreenChanges() {
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      if (evt.target.innerWidth <= 768) {
        // 768px portrait
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

}
