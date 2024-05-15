import { Routes } from '@angular/router';
import { GameIdResolver } from 'src/core/resolvers/game-id.resolver';

export const gameListRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/game-page/game-page.component').then(
        (m) => m.GamePageComponent
      ),
  },
  {
    path: 'games/:id',
    resolve: { game: GameIdResolver },
    loadComponent: () =>
      import('./pages/game-details-page/game-details-page.component').then(
        (m) => m.GameDetailsPageComponent
      ),
  },
];
