import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from 'src/core/Interceptors/auth/auth.interceptor';
import { GenreService } from 'src/routes/games-page/services/genre.service';
import { firstValueFrom } from 'rxjs';

function init(genresService: GenreService) {
  return () => firstValueFrom(genresService.getGenres());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withInterceptors([AuthInterceptor])),

    {
      provide: APP_INITIALIZER,
      useFactory: init, // (genresService: GenreService) => ()=> firstValueFrom(genresService.getGenres()),
      deps: [GenreService],
      multi: true,
    },
  ],
};
