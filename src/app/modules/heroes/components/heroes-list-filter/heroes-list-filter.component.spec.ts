import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {HeroesListFilterComponent} from './heroes-list-filter.component';

describe('HeroesListFilterComponent', () => {
  let component: HeroesListFilterComponent;
  let fixture: ComponentFixture<HeroesListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).overrideComponent(HeroesListFilterComponent, {}).compileComponents();

    fixture = TestBed.createComponent(HeroesListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sortChange event when onSortChange is called', () => {
    spyOn(component.sortChange, 'emit');
    component.onSortChange('name');
    expect(component.sortChange.emit).toHaveBeenCalledWith('name');
  });

  it('should emit filterChange event when onFilterChange is called', (done) => {
    const filterValue = 'test';
    component.filterChange.subscribe(value => {
      expect(value).toBe(filterValue);
      done();
    });
    component.onFilterChange(filterValue);
  });

  it('should debounce filterChange events', fakeAsync(async (done: any) => {
    jasmine.clock().install();
    const values: any[] = [];
    component.filterChange.subscribe(value => {
      values.push(value);
      if (values.length === 2) {
        expect(values).toEqual(['test1', 'test3']);
        done();
      }
    });
    component.onFilterChange('test1');
    jasmine.clock().tick(100);
    component.onFilterChange('test2');
    jasmine.clock().tick(300);
    component.onFilterChange('test3');
    jasmine.clock().uninstall();
  }));
});
