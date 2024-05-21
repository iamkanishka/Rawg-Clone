import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractGamesPageParams } from 'src/core/models/abstract-games-page-params';
import { SearchFilters } from 'src/core/models/search-filters';
import { AutoDestroyService } from 'src/core/services/Utils/auto-destroy.service';
import { AbstractGamesPageComponent } from 'src/shared/abstract-games-page/abstract-games-page.component';
import { GameListComponent } from 'src/shared/game-list/game-list.component';
import { SpinnerComponent } from 'src/shared/spinner/spinner.component';

@Component({
  selector: 'app-new-games',
  standalone: true,
  imports: [GameListComponent, SpinnerComponent],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl:
    '../../../../shared/abstract-games-page/abstract-games-page.component.html',
  styleUrl:
    '../../../../shared/abstract-games-page/abstract-games-page.component.css',
})
export class NewGamesComponent extends AbstractGamesPageComponent {
  override defaultSearchFilters: SearchFilters = {
    ...this.defaultSearchFilters,
    ordering: '-released',
    metacritic: '80,100',
  };

  override componentParams: AbstractGamesPageParams = {
    title: 'New and trending',
    subtitle: 'Based on player counts and release date',
    showFilters: true,
  };

  constructor() {
    super();
  }
}
