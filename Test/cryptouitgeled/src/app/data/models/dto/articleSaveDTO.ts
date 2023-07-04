import { ArticleBodyDTO } from './articleBodyDTO';
export class ArticleSaveDTO{
    title: string
    image: string
    body: ArticleBodyDTO

    constructor(title: string, image: string, body: ArticleBodyDTO){
        this.title = title;
        this.image = image;
        this.body = body;
    }
}