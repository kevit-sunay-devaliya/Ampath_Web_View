import { Routes } from '@angular/router';
import { BookTestComponent } from './book-test/book-test.component';

export const routes: Routes = [
  { path: '', component: BookTestComponent },
  { path: '**', redirectTo: '' },
];
