import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ViewHeroesComponent } from './view-heroes.component';
import { HeroesService } from '../../services/heroes.service';
import {provideRouter} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";

describe('ViewHeroesComponent', () => {
  let component: ViewHeroesComponent;
  let fixture: ComponentFixture<ViewHeroesComponent>;
  let heroesService: jasmine.SpyObj<HeroesService>;
  let authService : jasmine.SpyObj<AuthService >;

  beforeEach(async () => {
    const heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['getHeroes']);

    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: AuthService, useValue: authService }
      ]
    }).overrideComponent(ViewHeroesComponent,{}).compileComponents();

    fixture = TestBed.createComponent(ViewHeroesComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    heroesService = TestBed.inject(HeroesService) as jasmine.SpyObj<HeroesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch heroes on init', () => {
    heroesService.getHeroes.and.returnValue(of([]));
    component.ngOnInit();
    expect(heroesService.getHeroes).toHaveBeenCalled();
  });

  it('should filter heroes by name', () => {
    (component.heroesList as any) = [{ profile: { fullName: 'Hero 1' } }, { profile: { fullName: 'Hero 2' } }];
    component.onFilterChange('Hero 1');
    expect(component.filteredHeroesList.length).toBe(1);
    expect(component.filteredHeroesList[0].profile.fullName).toBe('Hero 1');
  });

  it('should sort heroes by name', () => {
    (component.filteredHeroesList as any) = [{ profile: { fullName: 'Hero 2' } }, { profile: { fullName: 'Hero 1' } }];
    component.onSortChange('name');
    expect(component.filteredHeroesList[0].profile.fullName).toBe('Hero 1');
    expect(component.filteredHeroesList[1].profile.fullName).toBe('Hero 2');
  });
});
