import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { Game, SearchResult } from 'src/core/models/Game';
import { SearchFilters } from 'src/core/models/search-filters';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  $games: WritableSignal<Game[]> = signal([]);
  private queryString: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public queryString$: Observable<string> = this.queryString.asObservable();
  public $loading: WritableSignal<boolean> = signal(false);

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private nextUrl: string = '';

  constructor(private httpClient: HttpClient) {}

  searchGames(filters: SearchFilters): Observable<SearchResult> {
    this.$loading.set(true);
    let params = new HttpParams({
      fromObject: { ...filters },
    });

    if (!filters.genres) params = params.delete('genres');

    return this.httpClient
      .get<SearchResult>(`${environment.BASE_API_URL}games`, { params })
      .pipe(
        tap((result) => (this.nextUrl = result.next)),
        finalize(() => this.$loading.set(false))
      );
  }

  nextPage(): Observable<SearchResult> {
    this.$loading.set(true);
    return this.httpClient.get<SearchResult>(this.nextUrl).pipe(
      tap((result) => (this.nextUrl = result.next)),
      finalize(() => this.$loading.set(false))
    );
  }

  setGames(games: Game[]): void {
    this.$games.set(games);
  }

  setQueryString(queryString: string): void {
    this.queryString.next(queryString);
  }
}
