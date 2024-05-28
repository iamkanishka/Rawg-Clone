import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';
import { Game } from 'src/core/models/Game';
import { GameCardComponent } from './game-card/game-card.component';
import { GameSearchService } from 'src/core/services/common/game-search.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [GameCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
})
export class GameListComponent {
  @Input({ required: true }) games: Game[] = []; 
  protected $loading :Signal<boolean> = this.gamesSearchService.$loading

  constructor(private gamesSearchService:GameSearchService){}
  
}
