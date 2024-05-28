import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { AutoDestroyService } from 'src/core/services/Utils/auto-destroy.service';
 
import { GameListComponent } from 'src/shared/game-list/game-list.component';
import { SpinnerComponent } from 'src/shared/spinner/spinner.component';
import { AbstractGamesPageComponent } from 'src/shared/abstract-games-page/abstract-games-page.component';
import { SearchFilters } from 'src/core/models/search-filters';
import { AbstractGamesPageParams } from 'src/core/models/abstract-games-page-params';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GameListComponent, SpinnerComponent, ReactiveFormsModule],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: '../../../../shared/abstract-games-page/abstract-games-page.component.html',
  styleUrl: '../../../../shared/abstract-games-page/abstract-games-page.component.css',
})
export class GamePageComponent extends  AbstractGamesPageComponent {
 
  override defaultSearchFilters: SearchFilters = {
    ...this.defaultSearchFilters,
  };

  override componentParams: AbstractGamesPageParams = {
    ...this.componentParams,
    title: 'All Games',
  };


  constructor(){
    super()
  }
}
