import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Genre } from 'src/core/models/Game';
import { GenreService } from 'src/routes/games-page/services/genre.service';
import { SpinnerComponent } from 'src/shared/spinner/spinner.component';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [RouterLink, SpinnerComponent],
  templateUrl: './genres-page.component.html',
  styleUrl: './genres-page.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class GenresPageComponent {
  $loading: Signal<boolean> = this.genreService.$loading;
  $genres: Signal<Genre[]> = this.genreService.$genres;

  constructor(private genreService: GenreService) {}

}
