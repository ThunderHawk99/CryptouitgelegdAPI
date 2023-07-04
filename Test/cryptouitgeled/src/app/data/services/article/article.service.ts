import { ArticleSaveDTO } from './../../models/dto/articleSaveDTO';
import { ArticleDTO } from './../../models/dto/articleDTO';
import { ArticleBodyDTO } from '../../models/dto/articleBodyDTO';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  getAll(): Observable<ArticleDTO[]>{
    return this.http.get<Array<ArticleDTO>>(`${this.apiUrl}articles`)
  }

  getArticleBody(id: number): Observable<ArticleBodyDTO>{
    return this.http.get<ArticleBodyDTO>(`${this.apiUrl}articles/body?id=${id}`)
  }

  saveArticle(articleSave: ArticleSaveDTO){
    return this.http.post<any>(`${this.apiUrl}articles/save`, articleSave)
  }
}
