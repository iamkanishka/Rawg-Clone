import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game } from 'src/core/models/Game';
import { GameCardComponent } from './game-card/game-card.component';

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
  
}
