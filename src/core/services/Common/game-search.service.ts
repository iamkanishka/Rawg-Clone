import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, SearchResult } from 'src/core/models/Game';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  $games: WritableSignal<Game[]> = signal([]);

  constructor(private httpClient: HttpClient) {}

  searchGames(): Observable<SearchResult> {
    return this.httpClient.get<SearchResult>(
      `${environment.BASE_API_URL}games`
    );
  }

  setGames(games: Game[]): void {
    this.$games.set(games);
  }
}
