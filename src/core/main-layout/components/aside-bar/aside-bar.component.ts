import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GenreService } from '../../../../routes/games-page/services/genre.service';
import { Genre } from 'src/core/models/Game';


@Component({
  selector: 'app-aside-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside-bar.component.html',
  styleUrl: './aside-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideBarComponent {
  $genres: Signal<Genre[]> = this.genreService.$genres;
  constructor(private genreService: GenreService) {}
}
