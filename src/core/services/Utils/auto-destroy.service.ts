import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoDestroyService extends Subject<boolean> implements OnDestroy {
  public ngOnDestroy(): void {
    console.log(this);
    
    this.next(true);
    this.complete();
  }
}
