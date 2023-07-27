import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Injector,
  OnInit,
  Output,
  runInInjectionContext
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {debounceTime, distinctUntilChanged, startWith, Subject, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit{
  search$ = new Subject<string>();
  @Output() termChanged = new EventEmitter<string>();

  injector = inject(Injector);

  search(target: any) {
    this.search$.next(target.value);
  }

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      this.search$.pipe(
        startWith('Angular'),
        distinctUntilChanged(),
        debounceTime(300),
        takeUntilDestroyed()
      ).subscribe((term) => this.termChanged.emit(term))
    })

  }
}
