import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  constructor(private genreService: GenreService, private router: Router) {
    /* Use Case
      When SideBar has list of Menu, 
      where each menu has a resuable componment with different route parameter, 
      then  use this code  "this.router.routeReuseStrategy.shouldReuseRoute = () => false;""
      Example Route:
      {
        path: 'genres/:genre',
        component: GenrePageComponent,
      },
    */

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
