import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import {Book} from "../book.interface";
import {StateService} from "../state.service";
import {BooksService} from "../books.service";
import {BookComponent} from "../book/book.component";
import {SearchComponent} from "../search/search.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, BookComponent, SearchComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  cart$: Observable<Book[]>;
  constructor(private stateService: StateService) {
    this.cart$ = this.stateService.selectCart$;
  }


}
