import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Genre } from 'src/core/models/Game';
import { AbstractGamesPageParams } from 'src/core/models/abstract-games-page-params';

import { AutoDestroyService } from 'src/core/services/Utils/auto-destroy.service';
import { AbstractGamesPageComponent } from 'src/shared/abstract-games-page/abstract-games-page.component';
import { GameListComponent } from 'src/shared/game-list/game-list.component';
import { SpinnerComponent } from 'src/shared/spinner/spinner.component';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [
    GameListComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl:
    '../../../../shared/abstract-games-page/abstract-games-page.component.html',
  styleUrl:
    '../../../../shared/abstract-games-page/abstract-games-page.component.css',
})
export class GenrePageComponent extends AbstractGamesPageComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('genre') genre!: string;
  private router:Router  = inject(Router)

  override componentParams: AbstractGamesPageParams = {
    ...this.componentParams,
    showFilters: false,
   };

  constructor() {
    super();
    this.defaultSearchFilters = {
      ...this.defaultSearchFilters,
    };
  }

  override ngOnInit(): void {
    this.setParentConfig();

    super.ngOnInit();
  }

  setParentConfig(): void {

    const genre: Genre | undefined = this.$genres().find(
      (genre: Genre) => genre.name.toLowerCase() === this.genre.toLowerCase()
    );
    if (!genre) {
      this.router.navigate(['/games']);
      return;
    }

    (this.defaultSearchFilters = {
      ...this.defaultSearchFilters,
      genres: this.genre.toLowerCase(),
    }),
      (this.componentParams.title = this.genre.slice(0,1).toUpperCase()+ this.genre.slice(1));
  }
}
