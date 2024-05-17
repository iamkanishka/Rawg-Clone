import { Component, Input, Signal, computed } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { Game } from 'src/core/models/Game';
import { RouterLink } from '@angular/router';
import { User } from 'src/core/models/user';
import { AuthService } from 'src/core/services/common/auth.service';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [DatePipe, RouterLink, NgClass],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  @Input({ required: true }) game: Game;
  $user: Signal<User | null> = this.authService.$user;
  $favourite: Signal<boolean> = computed(() => {
    const favoriteGames =
      this.authService.$user()?.$favouriteGames() ?? new Set();
    return favoriteGames.has(this.game.id);
  });
  constructor(private authService: AuthService) {}

  tooggleFavourite(): void {
    this.$user()?.addGame(this.game);
  }
}
