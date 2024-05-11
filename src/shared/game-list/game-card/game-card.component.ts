import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Game } from 'src/core/models/Game';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  @Input({required:true}) game!:Game
}
