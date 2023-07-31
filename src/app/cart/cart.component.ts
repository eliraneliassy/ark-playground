import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import {Book} from "../book.interface";

import {BooksService} from "../books.service";
import {BookComponent} from "../book/book.component";
import {SearchComponent} from "../search/search.component";
import {AppStore} from "../app.store";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, BookComponent, SearchComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  cart: Signal<Book[]>;
  constructor(private appStore: AppStore) {
    this.cart = this.appStore.selectCart;
  }


}
