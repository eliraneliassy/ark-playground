import { Injectable } from '@angular/core';
import {Book} from "./book.interface";
import {BehaviorSubject, map} from "rxjs";

export interface State {
  feed: Book[];
  cart: Book[]
}
@Injectable({
  providedIn: 'root'
})
export class StateService {

  private state$ = new BehaviorSubject<State>({
    feed: [],
    cart: []
  })

  selectFeed$ = this.state$.asObservable().pipe(
    map((state: State) => state.feed)
  );

  selectCart$ = this.state$.asObservable().pipe(
    map((state: State) => state.cart)
  );

  constructor() { }

  updateFeed(books: Book[]) {
    this.state$.next({...this.state$.getValue(), feed: books})
  }

  addToCart(book: Book) {
    const currentState = this.state$.getValue();
    this.state$.next({...this.state$.getValue(), cart: [...currentState.cart, book]})
  }


}
