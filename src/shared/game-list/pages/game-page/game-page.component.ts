import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSearchService } from 'src/core/services/Common/game-search.service';
import { AutoDestroyService } from 'src/core/services/Utils/auto-destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit {
  constructor(
    private gameSearchService: GameSearchService,
    private detsroy$: AutoDestroyService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  searchGames() {
    this.gameSearchService
      .searchGames()
      .pipe(takeUntil(this.detsroy$))
      .subscribe((data) => {
        console.log(data);
      });
  }
}
