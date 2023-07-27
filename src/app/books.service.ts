import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Book} from "./book.interface";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  BASE_URL = `https://www.googleapis.com/books/v1/volumes`;

  constructor(private httpClient: HttpClient) { }

  getBooks(term: string): Observable<Book[]> {
    let params = new HttpParams();
    params = params.append('q' , term);

    return this.httpClient.get<any>(this.BASE_URL, {params})
      .pipe(
        map((res: any) => res.items),
        map((items: any[]) => items.map((item: any) => ({
          title: item.volumeInfo.title,
          imageUrl: item.volumeInfo?.imageLinks?.thumbnail,
          price: item.volumeInfo.pageCount,
          description: item.volumeInfo.description
        })))
      )
  }
}
