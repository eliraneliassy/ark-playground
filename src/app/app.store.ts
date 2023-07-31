import {Injectable} from "@angular/core";
import {Book} from "./book.interface";
import {
  AfterUpdateInterceptor,
  Ark,
  BeforeInitInterceptor, BeforeUpdateInterceptor,
  CanBeConnected,
  mixinConnect,
  withInterceptors,
  withStoreConfiguration
} from "@e-square/ark";

export interface AppState{
  cart: Book[];
  feed: Book[];
}

const intialState: AppState = {
  cart: [],
  feed: []
};

const ConnectAppStateStore = mixinConnect<AppState>(Ark<AppState>);

const beforeInitInterceptor: BeforeInitInterceptor<AppState> = intialState => {
  console.log('My intial state is', intialState);
  return intialState;
}

const beforeUpdateInterctor: BeforeUpdateInterceptor<AppState> = (currentState, newState, store) => {
  console.log(currentState);
  return newState;
}



@Injectable({
  providedIn: 'root'
})
export class AppStore extends ConnectAppStateStore implements CanBeConnected<AppState>{

  selectFeed = this.select('feed');
  selectCart = this.select('cart');

  constructor() {
    super(intialState, withStoreConfiguration({name:'App Store'}), withInterceptors({
      beforeInit: [beforeInitInterceptor],
      beforeUpdate: [beforeUpdateInterctor]
    }));
  }
}
