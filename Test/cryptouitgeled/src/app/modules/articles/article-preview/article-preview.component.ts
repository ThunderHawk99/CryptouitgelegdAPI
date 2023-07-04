import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {

  @Input() title = '';

  @Input() imgSource = ''

  constructor() { }

  ngOnInit(): void {
  }

}
