import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {BookComponent} from "../book/book.component";
import {Observable, switchMap, tap} from "rxjs";
import {Book} from "../book.interface";
import {StateService} from "../state.service";
import {SearchComponent} from "../search/search.component";
import {BooksService} from "../books.service";


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, BookComponent, SearchComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent {
  feed$: Observable<Book[]>;
  constructor(private stateService: StateService, private bookService: BooksService) {
    this.feed$ = this.stateService.selectFeed$;
  }

  termChanged(term: string) {
    this.bookService.getBooks(term).subscribe(
      (res) => this.stateService.updateFeed(res)
    )
  }

  addToCart(book: Book){
    this.stateService.addToCart(book);
  }
}
