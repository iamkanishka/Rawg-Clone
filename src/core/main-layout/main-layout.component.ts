import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoDestroyService } from '../services/Utils/auto-destroy.service';
import {
  Subject,
  take,
} from 'rxjs';
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
export class MainLayoutComponent {
  query: string;
  queryChange$: Subject<string> = new Subject<string>();

  constructor(private genreService: GenreService) {
    this.getGenres();
  }

  getGenres(): void {
    this.genreService.getGenres().pipe(take(1)).subscribe();
  }
}
