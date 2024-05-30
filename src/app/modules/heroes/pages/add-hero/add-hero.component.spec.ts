
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AddHeroComponent } from './add-hero.component';
import { HeroesService } from '../../services/heroes.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

describe('AddHeroComponent', () => {
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;
  let heroesService: jasmine.SpyObj<HeroesService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['getProfiles', 'getHeroByProfileId', 'addHero', 'updateHero']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).overrideComponent(AddHeroComponent,{}).compileComponents();

    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService) as jasmine.SpyObj<HeroesService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add power to form array when addPower is called', () => {
    component.addPower();
    expect(component.powers.length).toBe(2);
  });

  it('should remove power from form array when removePower is called', () => {
    component.addPower();
    component.removePower(1);
    expect(component.powers.length).toBe(1);
  });

  it('should call getProfiles on HeroesService when getHeroesList is called', () => {
    heroesService.getProfiles.and.returnValue(of([]));
    component.getHeroesList();
    expect(heroesService.getProfiles).toHaveBeenCalled();
  });

  it('should call addHero on HeroesService when onAddNew is called', () => {
    heroesService.addHero.and.returnValue(of());
    component.onAddNew();
    expect(heroesService.addHero).toHaveBeenCalled();
  });

  it('should call updateHero on HeroesService when onUpdate is called', () => {
    heroesService.updateHero.and.returnValue(of());
    (component.hero as any) = { id: '1' };
    component.onUpdate();
    expect(heroesService.updateHero).toHaveBeenCalled();
  });

  it('should navigate to /manage when navigateBack is called', () => {
    component.navigateBack();
    expect(router.navigate).toHaveBeenCalledWith(['/manage']);
  });
});
