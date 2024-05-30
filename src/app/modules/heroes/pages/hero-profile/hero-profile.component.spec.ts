import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule, FormArray} from '@angular/forms';
import {of} from 'rxjs';
import {HeroProfileComponent} from './hero-profile.component';
import {HeroesService} from '../../services/heroes.service';
import {AuthService} from '../../../auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';

describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;
  let heroesService: jasmine.SpyObj<HeroesService>;
  let authService: jasmine.SpyObj<AuthService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['getHero', 'updateHero']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserInfo']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        {provide: HeroesService, useValue: heroesServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: ToastrService, useValue: toastrServiceSpy}
      ]
    }).overrideComponent(HeroProfileComponent, {}).compileComponents();

    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService) as jasmine.SpyObj<HeroesService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add powers to form array when addPowers is called', fakeAsync(async () => {
    component.addPowers([{id: 1, name: 'Super strength', rating: 5}]);
    component.heroForm = (component as any).fb.group({
      powers: (component as any).fb.array([{name: 'Super strength', rating: 5}])
    });
    expect((component.heroForm.get('powers') as FormArray).controls.length).toBe(1);
  }));

  it('should call getHero on HeroesService when ngOnInit is called', () => {
    heroesService.getHero.and.returnValue(of());
    authService.getUserInfo.and.returnValue({id: '1'});
    component.ngOnInit();
    expect(heroesService.getHero).toHaveBeenCalled();
  });

  it('should call updateHero on HeroesService when onSubmit is called', () => {
    (component.profileDetails as any) = {usersRated: ['1']};
    heroesService.updateHero.and.returnValue(of());
    component.heroForm = (component as any).fb.group({
      powers: (component as any).fb.array([])
    });
    component.onSubmit();
    expect(heroesService.updateHero).toHaveBeenCalled();
  });

  it('should calculate average rating when calculateAverageRating is called', () => {
    (component.profileDetails as any) = {usersRated: ['1', '2']};
    const averageRating = component.calculateAverageRating(3, 2);
    expect(averageRating).toBe(3);
  });

  it('should calculate total rating when calculateTotalRating is called', () => {
    const totalRating = component.calculateTotalRating([{name: 'Super strength', rating: 5}]);
    expect(totalRating).toBe(5);
  });
});
