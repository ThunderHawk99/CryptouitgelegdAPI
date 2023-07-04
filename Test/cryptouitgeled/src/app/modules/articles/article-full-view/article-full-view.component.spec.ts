import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFullViewComponent } from './article-full-view.component';

describe('ArticleFullViewComponent', () => {
  let component: ArticleFullViewComponent;
  let fixture: ComponentFixture<ArticleFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleFullViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
