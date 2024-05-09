import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GameSearchService } from 'src/core/services/common/game-search.service';
import { AutoDestroyService } from 'src/core/services/Utils/auto-destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [JsonPipe],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit {
  $games = this.gameSearchService.$games;

  constructor(
    private gameSearchService: GameSearchService,
    private detsroy$: AutoDestroyService
  ) {}

  ngOnInit(): void {
    this.searchGames();
  }

  searchGames() {
    this.gameSearchService
      .searchGames()
      .pipe(takeUntil(this.detsroy$))
      .subscribe((data) => {
        this.gameSearchService.setGames(data.results);
      });
  }
}
