import { TagDTO } from './../../models/dto/tagDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  getAll(): Observable<TagDTO[]>{
    return this.http.get<TagDTO[]>(`${this.apiUrl}tags`)
  }
}
