import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDetails } from 'src/core/models/game-details';

@Component({
  selector: 'app-game-details-page',
  standalone: true,
  imports: [],
  templateUrl: './game-details-page.component.html',
  styleUrl: './game-details-page.component.css',
})
export class GameDetailsPageComponent implements OnInit {
  gameDetails: GameDetails;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gameDetails = this.route.snapshot.data['game'] as GameDetails;
  }
}
