import {Component, EventEmitter, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-heroes-list-filter',
  standalone: true,
  imports: [],
  templateUrl: './heroes-list-filter.component.html',
  styleUrl: './heroes-list-filter.component.scss'
})
export class HeroesListFilterComponent {
  /**
   * @Output() sortChange - An event emitter that emits an event whenever the sort order changes.
   * The emitted value is a string representing the new sort order by name or power.
   */
  @Output() sortChange = new EventEmitter<string>();

  /**
   * @Output() filterChange - An event emitter that emits an event whenever the filter value changes.
   * The emitted value is a string representing the new filter value.
   */
  @Output() filterChange = new EventEmitter<string>();

  sort: string = 'power';
  filter: Subject<string> = new Subject<string>();

  constructor() {
    this.filter.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => this.filterChange.emit(value));
  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.sortChange.emit(this.sort);
  }

  onFilterChange(filter: string): void {
    this.filter.next(filter);
  }
}
