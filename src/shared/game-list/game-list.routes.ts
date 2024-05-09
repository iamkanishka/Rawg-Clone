import { Routes } from '@angular/router';

export const gameListRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/game-page/game-page.component').then(
        (m) => m.GamePageComponent
      ),
  },
];
