import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameSearchService } from 'src/core/services/common/game-search.service';
import { AutoDestroyService } from 'src/core/services/Utils/auto-destroy.service';
import { 
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs';
import { GameListComponent } from 'src/shared/game-list/game-list.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GameListComponent],
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
    //this.searchGames();
    this.gameSearchService.queryString$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((title: string) => {
          return this.gameSearchService.searchGames(title);
        }),
        takeUntil(this.detsroy$)
      )
      .subscribe((data) => {
        this.gameSearchService.setGames(data.results);
      });
  }
} 
