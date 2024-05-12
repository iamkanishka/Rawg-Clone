import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDetails } from 'src/core/models/game-details';
import { environment } from 'src/environments/environment';

Injectable({ providedIn: 'root'})
export class GameService {
  constructor(private httpClient: HttpClient) {}

  getGameById(id: number): Observable<GameDetails> {
    return this.httpClient.get<GameDetails>(
      `${environment.BASE_API_URL}games/${id}`
    );
  }
}

