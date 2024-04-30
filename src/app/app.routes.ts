import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { HelloComponent } from './hello/hello.component';

export const routes: Routes = [
  { path: '', component: HelloComponent },
  { path: 'experiment', component: ItemListComponent },
  { path: 'thank-you', component: ThankYouComponent },
];
