import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'feed', pathMatch: 'full'},
  {path: 'feed', loadComponent: () => import('./feed/feed.component').then(c => c.FeedComponent)},
  {path: 'cart', loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent)}
];
