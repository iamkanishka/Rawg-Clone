import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, finalize, map, of, tap } from 'rxjs';
import { Genre } from 'src/core/models/Game';
import { GenresResult } from 'src/core/models/genres';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class GenreService {
  public $loading: WritableSignal<boolean> = signal(false);
  public $genres: WritableSignal<Genre[]> = signal([]);

  constructor(private httpClinet: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    this.$loading.set(true);
    if (this.$genres().length > 0) {
      this.$loading.set(false);
      return of(this.$genres());
    }
    return this.httpClinet
      .get<GenresResult>(`${environment.BASE_API_URL}genres`)
      .pipe(
        tap((result) => this.$genres.set(result.results)),
        map((result) => result.results),
        finalize(() => this.$loading.set(false))
      );
  }
}
