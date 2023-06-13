import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'editor',
    pathMatch: 'full',
  },
  {
    path: 'editor',
    loadComponent: () =>
      import('./editor/editor.page').then((m) => m.EditorPage),
  },
  {
    path: 'code',
    loadComponent: () => import('./code/code.page').then((m) => m.CodePage),
  },
];
