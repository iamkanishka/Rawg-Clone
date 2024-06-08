import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  WritableSignal,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  exhaustMap,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Game, Genre, SearchResult } from 'src/core/models/Game';
import { AutoDestroyService } from 'src/core/services/Utils/auto-destroy.service';
import { GameSearchService } from 'src/core/services/common/game-search.service';
import { GameListComponent } from '../game-list/game-list.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SearchFilters } from 'src/core/models/search-filters';
import { AbstractGamesPageParams } from 'src/core/models/abstract-games-page-params';
import { GenreService } from 'src/routes/games-page/services/genre.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-abstract-games-page',
  standalone: true,
  imports: [GameListComponent, SpinnerComponent, ReactiveFormsModule, InfiniteScrollModule],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './abstract-games-page.component.html',
  styleUrl: './abstract-games-page.component.css',
})
export abstract class AbstractGamesPageComponent implements OnInit {
  private readonly gamesSearchService: GameSearchService =
    inject(GameSearchService);
  private readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  private readonly genreService: GenreService = inject(GenreService);

  private readonly fb: FormBuilder = inject(FormBuilder);

  $games: WritableSignal<Game[]> = this.gamesSearchService.$games;
  $genres: Signal<Genre[]> = this.genreService.$genres;

  $loading: Signal<boolean> = this.gamesSearchService.$loading;

  filters$: BehaviorSubject<SearchFilters>;

  scrolled$: Subject<void> = new Subject();

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  orderPreference: string = 'Relevance';

  defaultSearchFilters: SearchFilters = {
    search: '',
    page_size: 25,
    ordering: '-relevance',
    genres: '',
  };

  componentParams: AbstractGamesPageParams = {
    title: 'Please provide a title',
    showFilters: true,
  };

  form: FormGroup;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    this.filters$ = new BehaviorSubject<SearchFilters>({
      ...this.defaultSearchFilters,
    });
    if (this.componentParams.showFilters) {
      this.initForm();
    }
    this.subscribeToFiltersChange();
    this.subscribeToQueryChanges();
    this.subscribetoInfiniteScroll()

    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      order: [this.defaultSearchFilters.ordering],
      genres: [this.defaultSearchFilters.genres],
    });

    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const ordering = this.form.controls['order'].value;
      const genres = this.form.controls['genres'].value;
      this.filters$.next({
        ...this.filters$.getValue(),
        ordering,
        genres,
      });
    });
  }

  subscribetoInfiniteScroll() {
    this.scrolled$
      .pipe(
        exhaustMap(() => this.gamesSearchService.nextPage()),
        takeUntil(this.destroy$)
      )
      .subscribe((data: SearchResult) => {
        this.$games.update((values: Game[]) => {
          return [ ...values, ...data.results ];
        });
      });
  }

  subscribeToFiltersChange(): void {
    this.filters$
      .pipe(
        tap(() => this.$games.set([])),
        switchMap((filters: SearchFilters) =>
          this.gamesSearchService.searchGames(filters)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((data: SearchResult) => {
        this.$games.set(data.results);
      });
  }

  subscribeToQueryChanges(): void {
    this.gamesSearchService.queryString$
      .pipe(takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.filters$.next({
          ...this.filters$.getValue(),
          search: query,
        });
      });
  }
}
