import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game, SearchResult } from 'src/core/models/Game';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  $games: WritableSignal<Game[]> = signal([]);
  private queryString: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public queryString$: Observable<string> = this.queryString.asObservable();

  constructor(private httpClient: HttpClient) {}

  searchGames(title: string): Observable<SearchResult> {
    const params = new HttpParams({ fromObject: { search:title } });
    return this.httpClient.get<SearchResult>(
      `${environment.BASE_API_URL}games`,
      { params }
    );
  }

  setGames(games: Game[]): void {
    this.$games.set(games);
  }

  setQueryString(queryString: string): void {
    this.queryString.next(queryString);
  }
}
