import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoDestroyService } from '../services/Utils/auto-destroy.service';
import { GameSearchService } from '../services/common/game-search.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  providers: [AutoDestroyService],
  imports: [RouterOutlet, FormsModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  query: string;
  queryChange$: Subject<string> = new Subject<string>();

  constructor(
    private destroy$: AutoDestroyService,
    private gameSearchService: GameSearchService
  ) {}

  ngOnInit(): void {
    this.subscribetoInputChanges()
  }

  subscribetoInputChanges() {
    this.queryChange$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.gameSearchService.setQueryString(this.query);
      });
  }
}
