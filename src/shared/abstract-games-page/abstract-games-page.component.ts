import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  TemplateRef,
  inject,
} from '@angular/core';
import { switchMap, takeUntil, tap } from 'rxjs';
import { Game } from 'src/core/models/Game';
import { AutoDestroyService } from 'src/core/services/Utils/auto-destroy.service';
import { GameSearchService } from 'src/core/services/common/game-search.service';
import { GameListComponent } from '../game-list/game-list.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SearchFilters } from 'src/core/models/search-filters';
import { NgTemplateOutlet } from '@angular/common';
import { AbstractGamesPageParams } from 'src/core/models/abstract-games-page-params';

@Component({
  selector: 'app-abstract-games-page',
  standalone: true,
  imports: [GameListComponent, SpinnerComponent, NgTemplateOutlet],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './abstract-games-page.component.html',
  styleUrl: './abstract-games-page.component.css',
})
export abstract class AbstractGamesPageComponent implements OnInit {
  private readonly gameSearchService: GameSearchService =
    inject(GameSearchService);
  private readonly detsroy$: AutoDestroyService = inject(AutoDestroyService);
  
  headerTemplate: TemplateRef<unknown> |  null = null;


  


  $games: Signal<Game[]> = this.gameSearchService.$games;
  $loading: Signal<boolean> = this.gameSearchService.$loading;

  defaultSearchFilters: SearchFilters = {
    search: '',
    page_size: 25,
    ordering: '-relevance',
  };

  componentParams: AbstractGamesPageParams = {
    title: 'Please provide a title',
    showFilters: true,
  };


  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    //this.searchGames();
    this.gameSearchService.queryString$
      .pipe(
        tap((query: string) => (this.defaultSearchFilters.search = query)),
        switchMap(() => {
          return this.gameSearchService.searchGames(this.defaultSearchFilters);
        }),
        takeUntil(this.detsroy$)
      )
      .subscribe((data) => {
        this.gameSearchService.setGames(data.results);
      });
  }
}
