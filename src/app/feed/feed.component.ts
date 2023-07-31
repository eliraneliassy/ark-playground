import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {BookComponent} from "../book/book.component";
import {Observable, Subject, switchMap, tap} from "rxjs";
import {Book} from "../book.interface";

import {SearchComponent} from "../search/search.component";
import {BooksService} from "../books.service";
import {AppStore} from "../app.store";


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, BookComponent, SearchComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent {
  feed: Signal<Book[]>;
  term$ = new Subject<string>();

  search$ = this.term$.pipe(
    switchMap((term) => this.bookService.getBooks(term))
  );
  constructor(private appStore: AppStore, private bookService: BooksService) {
    this.feed = this.appStore.selectFeed;
    this.appStore.connect(this.search$, 'feed');
  }

  termChanged(term: string) {
    // this.bookService.getBooks(term).subscribe(
    //   (feed) => this.appStore.update({feed})
    // )

    this.term$.next(term);





  }

  addToCart(book: Book){
    this.appStore.update((currentState) => ({...currentState, cart: [...currentState.cart, book]}))
  }
}
