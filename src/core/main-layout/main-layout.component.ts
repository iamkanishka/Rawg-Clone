import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoDestroyService } from '../services/Utils/auto-destroy.service';
import { GameSearchService } from '../services/common/game-search.service';
import { Subject, debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { GenreService } from 'src/routes/games-page/services/genre.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  providers: [AutoDestroyService],
  imports: [RouterOutlet, FormsModule, AsideBarComponent, TopBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  query: string;
  queryChange$: Subject<string> = new Subject<string>();

  constructor(
    private destroy$: AutoDestroyService,
    private gameSearchService: GameSearchService,
    private genreService: GenreService
  ) {
    this.getGenres();
  }

  ngOnInit(): void {
    this.subscribetoInputChanges()
  }


 
  getGenres(): void {
    this.genreService.getGenres().pipe(take(1)).subscribe();
  }



  subscribetoInputChanges() {
    this.queryChange$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.gameSearchService.setQueryString(this.query);
      });
  }
}
