import { Routes } from '@angular/router';
import { CvPage } from './pages/cv-page/cv-page';

export const routes: Routes = [
  { path: '', component: CvPage, data: { lang: 'en' } },
  { path: 'pl', component: CvPage, data: { lang: 'pl' } },
  { path: '**', redirectTo: '' },
];
