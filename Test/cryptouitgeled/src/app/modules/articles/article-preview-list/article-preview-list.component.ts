import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-preview-list',
  templateUrl: './article-preview-list.component.html',
  styleUrls: ['./article-preview-list.component.scss']
})
export class ArticlePreviewListComponent implements OnInit {

  
  @Input() title = '';

  @Input() imgSource = ''

  @Input() description = ''

  constructor() { }

  ngOnInit(): void {
  }
}
