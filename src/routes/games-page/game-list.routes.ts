import { Routes } from '@angular/router';
import { GameIdResolver } from 'src/core/resolvers/game-id.resolver';
import { NewGamesComponent } from './pages/new-games/new-games.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { GameDetailsPageComponent } from './pages/game-details-page/game-details-page.component';
import { GenrePageComponent } from '../genre-page/pages/genre-page/genre-page.component';
import { GenresPageComponent } from '../genre-page/pages/genres-page/genres-page.component';

export const gameListRoutes: Routes = [
  {
    path: '',
    component: NewGamesComponent,
  },
  {
    path: 'games',
    component: GamePageComponent,
  },
  {
    path: 'games/:id',
    resolve: { game: GameIdResolver },
    component: GameDetailsPageComponent,
  },
  {
    path: 'genres',
    component: GenresPageComponent,
  },
  {
    path: 'genres/:genre',
    component: GenrePageComponent,
  },
];
